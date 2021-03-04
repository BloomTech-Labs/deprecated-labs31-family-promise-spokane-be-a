const docusign = require("docusign-esign"),
  validator = require("validator"),
  dsConfig = require("./config/index.js").config; //***** includes appsettings.json; check appsettings.example if unsure what a config item is */

const environment = process.env.ENVIRONMENT || "development"
let appUrl = process.env.FRONT_END_LOCAL
if (environment === "development") {
  appUrl = process.env.FRONT_END_DEPLOY
}
const eg001EmbeddedSigning = exports,
  eg = "eg001", //legacy name for the file from DocuSign's Quickstart demo app
  mustAuthenticate = "/ds/mustAuthenticate",
  minimumBufferMin = 3,
  signerClientId = 1, // *********** replaced on line 35 with OKTA user ID **************
  dsReturnUrl = appUrl + "/staffsig",
  dsPingUrl = appUrl + "/"; // Url that will be pinged by the DocuSign signing via Ajax



/**
 * Create the envelope, the embedded signing, and then redirect to the DocuSign signing
 * @param {object} req Request obj
 * @param {object} res Response obj
 */

//  starts Docusign flow
eg001EmbeddedSigning.createController = async (req, res) => {
  // ************** Double checks access token. *****************
  await req.dsAuthJwt.getToken();
  // Step 1. Double-check the access token
  // At this point we should have a good token. But we
  // double-check here to enable a better UX to the user.
  let tokenOK = req.dsAuthJwt.checkToken(minimumBufferMin);
  if (!tokenOK) {
    // ********** we were getting issues with flash but it seems to be like alert() ****
    // req.flash("info", "Sorry, you need to re-authenticate.");
    // Save the current operation so it will be resumed after authentication
    req.dsAuthJwt.setEg(req, eg);
    res.redirect(mustAuthenticate);
  }

  // Step 2. Creates envelope
  let body = req.body,
    // Additional data validation might also be appropriate
    // ********Validator is similar to yup validation ******
    signer1Email = validator.escape(body.signer1Email),
    signer1Name = validator.escape(body.signer1Name),
    signerClientId = validator.escape(body.signer1Id)
    // *******leaving these if you want to add multiple signers*********
    // signer2Email = validator.escape(body.signer2Email),
    // signer2Name = validator.escape(body.signer2Name),
    // staffEmail = validator.escape(body.staffEmail),
    // staffName = validator.escape(body.staffName),
    envelopeArgs = {
      templateId: process.env.DOCUSIGN_TEMPLATE_ID,
      signer1Email: signer1Email,
      signer1Name: signer1Name,
      // signer2Email: signer2Email,
      // signer2Name: signer2Name,
      // staffEmail: staffEmail,
      // staffName: staffName,
      clientUserId: signerClientId,
      dsReturnUrl: dsReturnUrl,
      dsPingUrl: dsPingUrl,
    },
    args = {
      accessToken: req.dsAuthJwt.accessToken,
      basePath: dsConfig.restAPIUrl,
      accountId: dsConfig.dsJWTClientId,
      envelopeArgs: envelopeArgs,
      brandId: "37dd6dd4-9b01-4902-81ee-0da2d3c62685",
      Id: signerClientId,
    },
    results = null;
  try {
    results = await eg001EmbeddedSigning.worker(args);
  } catch (error) {
    // *****error doesn't always have a response... you can console log just error******
    let errorBody = error.response.body;
    res.status(error.status || 500).json({
      message: error.message,
      errorBody: errorBody,
    });
  }
  if (results) {
    // Redirect the user to the embedded signing
    // Don't use an iFrame!
    // State can be stored/recovered using the framework's session or a
    // query parameter on the returnUrl (see the makeRecipientViewRequest method)'
    // *************************************** console.log("This is the redirect URL to DocuSign: ", results.redirectUrl)
    res.status(200).json(results.redirectUrl);
  }
};

/**
 * This function does the work of creating the envelope and the
 * embedded signing
 * @param {object} args
 */
eg001EmbeddedSigning.worker = async (args) => {
  // args 
  // args.basePath
  // args.accessToken
  // args.accountId
  let dsApiClient = new docusign.ApiClient();
  dsApiClient.setBasePath(args.basePath);
  dsApiClient.addDefaultHeader("Authorization", "Bearer " + args.accessToken);
  let envelopesApi = new docusign.EnvelopesApi(dsApiClient),
    results = null;

  // Step 1. Make the envelope request body
  // ***************************** Fills in envelope template *****************************
  // *********************** is a function below ***************************
  let envelope = makeEnvelope(args.envelopeArgs);

  // Step 2. call Envelopes::create API method
  // Exceptions will be caught by the calling function
  // ***************************** createEnvelope is a "model" in the envelopes API that creates a new envelope *****************************
  // ******************* not a function in current file. calls DocuSign envelopes API *******************
  results = await envelopesApi.createEnvelope(args.accountId, {
    envelopeDefinition: envelope,
  });

  let envelopeId = results.envelopeId;
  console.log(`Envelope was created. EnvelopeId ${envelopeId}`);

  // Step 3. create the recipient view, the embedded signing
  // ***************************** This is what brings the template to the signer view *****************************
  // ***************************** is a function below **********************
  let viewRequest = makeRecipientViewRequest(args.envelopeArgs);
  // Call the CreateRecipientView API
  // Exceptions will be caught by the calling function
  results = await envelopesApi.createRecipientView(args.accountId, envelopeId, {
    recipientViewRequest: viewRequest,
  });

  return { envelopeId: envelopeId, redirectUrl: results.url };
};

function makeEnvelope(args) {
  // args
  // args.signerEmail
  // args.signerName
  // args.ccEmail
  // args.ccName
  // args.templateId

  // create the envelope definition
  let env = new docusign.EnvelopeDefinition();
  env.templateId = args.templateId;

  // Create template role elements to connect the signer and cc recipients
  // to the template
  // We're setting the parameters via the object creation
  let signer1 = docusign.TemplateRole.constructFromObject({
    clientUserId: signerClientId,
    email: args.signer1Email,
    name: args.signer1Name,
    roleName: "Signer 1",
    // ********************should be able to add routing order for multiple signers**************
  });

  // let signer2 = docusign.TemplateRole.constructFromObject({
  //   email: args.signer2Email,
  //   name: args.signer2Name,
  //   roleName: "Signer 2",
  // });

  // let staff = docusign.TemplateRole.constructFromObject({
  //   email: args.staffEmail,
  //   name: args.staffName,
  //   roleName: "Staff",
  // });

  // Add the TemplateRole objects to the envelope object
  env.templateRoles = [signer1];
  env.status = "sent"; // ***** should always be sent *****

  return env;
}

function makeRecipientViewRequest(args) {
  // Data for this method
  // args.dsReturnUrl
  // args.signerEmail
  // args.signerName
  // args.signerClientId
  // args.dsPingUrl

  let viewRequest = new docusign.RecipientViewRequest();

  // The query parameter is included as an example of how
  // to save/recover state information during the redirect to
  // the DocuSign signing. It's usually better to use
  // the session mechanism of your web framework. Query parameters
  // can be changed/spoofed very easily.
  viewRequest.returnUrl = args.dsReturnUrl; // ***************************** Set the url where you want the recipient to go once they are done signing *****************************

  // How has your app authenticated the user? In addition to your app's
  // authentication, you can include authenticate steps from DocuSign.
  // Eg, SMS authentication
  // ********************** Only change if you want Docusign to authenticate signer
  // ********************** Plan was to use FP Okta to authenticate so none.
  viewRequest.authenticationMethod = "none";

  // Recipient information must match embedded recipient info
  // we used to create the envelope.
  viewRequest.email = args.signer1Email; // ***************************** email for signer *****************************
  viewRequest.userName = args.signer1Name; // ***************************** name when signing up for signer *****************************
  viewRequest.clientUserId = signerClientId; // ***************************** signer ID *****************************

  // DocuSign recommends that you redirect to DocuSign for the
  // embedded signing. There are multiple ways to save state.
  // To maintain your application's session, use the pingUrl
  // parameter. It causes the DocuSign signing web page
  // (not the DocuSign server) to send pings via AJAX to your
  // app,
  // ************************** This might help with logging out/back in when signing ?? but we're not sure how it works
  // ***************************** Will send a ping to FP website so Okta does not sign us out for inactivity *****************************
  viewRequest.pingFrequency = 600; // seconds
  // ***************************** NOTE: The pings will only be sent if the pingUrl is an https address *****************************
  viewRequest.pingUrl = args.dsPingUrl; // optional setting
  return viewRequest;
}
