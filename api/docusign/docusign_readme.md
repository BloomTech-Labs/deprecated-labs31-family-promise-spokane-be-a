### Private.key
Contains RSA key from Docusign account. Make sure it's in the gitignore!

### Updating signing forms
If you need to create a new template, you can do so through the Docusign developer account. There's a GUI through their website where you can create a new template and it will return a template id that you can replace in the eg001embeddedsigning.js file. You must use the same value for Signer Role (ex:"Signer 1") in template creation as you do for each signer's roleName attribute in the eg001 file.

### Multiple signers
You should be able to add multiple signers to the Docusign flow using routing order. [See first StackOverflow answer here](https://stackoverflow.com/questions/21385552/docusign-rest-api-recipientview-exception-unknown-envelope-recipient/21385876)
