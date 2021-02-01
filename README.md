# Basic Node API Scaffold

Welcome to your `Basic Node API Repository`. Use this to start your own Greenfield Project using nodejs, express and common industry standards.

This repository assumes a handful of industry practices and standards. We strive to keep you on the bleeding edge of the industry and as a result, we have made some opinions for you so that you don't have to; you're welcome.

Read more at <https://docs.labs.lambdaschool.com/labs-api-strarter/>

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=labs-api-starter&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=labs-api-starter)

## Requirements

Labs teams must follow all [Labs Engineering Standards](https://labs.lambdaschool.com/topics/node-js/).


## Getting Started

### Enviornment Variables

- `PORT` - API port (optional, but helpful with FE running as well)
  - The following ports are whitelisted for use with okta
    - 3000
    - 8000
    - 8080
- `DS_API_URL` - URL to a data science api. (eg. <https://ds-bw-test.herokuapp.com/>)
- `DS_API_TOKEN` - authorization header token for data science api (eg. SUPERSECRET)
- `DATABASE_URL` - connection string for postgres database
- `OKTA_URL_ISSUER` - The complete issuer URL for verifying okta access tokens. `https://example.okta.com/oauth2/default`
- `OKTA_CLIENT_ID` - the okta client ID.

See .env.sample for example values

### Setup postgres

There are 3 options to get postgresql installed locally [Choose one]:

1. Use docker. [Install](https://docs.docker.com/get-docker/) for your platform
    - run: `docker-compose up -d` to start up the postgresql database and pgadmin.
    - Open a browser to [pgadmin](http://localhost:5050/) and you should see the Dev server already defined.
    - If you need to start over you will need to delete the folder `$ rm -rf ./data/pg` as this is where all of the server data is stored.
      - if the database `api-dev` was not created then start over.
2. Download and install postgresql directly from the [main site](https://www.postgresql.org/download/)
    - make note of the port, username and password you use to setup the database.
    - Connect your client to the server manually using the values previously mentioned
    - You will need to create a database manually using a client.
    - Make sure to update the DATABASE_URL connection string with the values for username/password, databasename and server port (if not 5432).
3. Setup a free account at [ElephantSQL](https://www.elephantsql.com/plans.html)
    - Sign up for a free `Tiney Turtle` plan
    - copy the URL to the DATABASE_URL .env variable
    - make sure to add `?ssl=true` to the end of this url

### Setup the application

- create your project repo by forking or using this as a template.
- run: `npm install` to download all dependencies.
- run: `cp .env.sample .env` and update the enviornment variables to match your local setup.
- run: `npm run knex migrate:latest` to create the starting schema.
- run: `npm run knex seed:run` to populate your db with some data.
- run: `npm run tests` to confirm all is setup and tests pass.
- run: `npm run watch:dev` to start nodemon in local dev enviornment.

> Make sure to update the details of the app name, description and version in
> the `package.json` and `config/jsdoc.js` files.

## Contributing

See the [contributing doc](https://github.com/Lambda-School-Labs/labs-api-starter/blob/main/CONTRIBUTING.md)
for more info.

# REST API - Family Promise

Family Promise REST API

## Logs (start here)

Get all logs: **/logs**

HTTP Method: **[GET]**
 
**Example:**

    {
        "reservation_id": 1,
        "supervisor_id": "00u2lh0bsAliwLEe75d6",
        "family_id": 1,
        "reservation_status": true,
        "waitlist": false,
        "on_site_7pm": true,
        "on_site_10pm": true,
        "date": null,
        "time": null,
        "beds_reserved": 5,
        "actual_beds_reserved": 5,
        "members_staying": []
    },
    {
        "reservation_id": 2,
        "supervisor_id": "00u2lh0bsAliwLEe75d6",
        "family_id": 1,
        "reservation_status": true,
        "waitlist": false,
        "on_site_7pm": true,
        "on_site_10pm": true,
        "date": null,
        "time": null,
        "beds_reserved": 5,
        "actual_beds_reserved": 5,
        "members_staying": []
    },
    {
        "reservation_id": 3,
        "supervisor_id": "00u2lh0bsAliwLEe75d6",
        "family_id": 1,
        "reservation_status": true,
        "waitlist": false,
        "on_site_7pm": true,
        "on_site_10pm": true,
        "date": null,
        "time": null,
        "beds_reserved": 5,
        "actual_beds_reserved": 5,
        "members_staying": []
    }

**Response:** (200) - success

=========================================================================

Get an individual log: **/logs/:id**

HTTP Method: **[GET]**
 
**Example:**

    {
        "reservation_id": 1,
        "supervisor_id": "00u2lh0bsAliwLEe75d6",
        "family_id": 1,
        "reservation_status": true,
        "waitlist": false,
        "on_site_7pm": true,
        "on_site_10pm": true,
        "date": null,
        "time": null,
        "beds_reserved": 5,
        "actual_beds_reserved": 5,
        "members_staying": []
    }

**Response:** (200) - success

=========================================================================

POST a log: **/logs**

HTTP Method: **[POST]**
 
**Example:**

Request Body

    {
        "reservation_id": 5,
        "supervisor_id": "00u2lh0bsAliwLEe75d6",
        "family_id": 1,
        "reservation_status": true,
        "waitlist": false,
        "on_site_7pm": false,
        "on_site_10pm": false,
        "date": null,
        "time": null,
        "beds_reserved": 2,
        "actual_beds_reserved": 2,
        "members_staying": [
            "Thomas Shelby",
            "Jacob Shelby"
        ]
    },
    
**Response:** (200) - logs created

=========================================================================

PUT (edit) a log: **/logs/:id*

HTTP Method: **[POST]**
 
**Example:**

Request Body

    {
        "reservation_id": 5,
        "supervisor_id": "00u2lh0bsAliwLEe75d6",
        "family_id": 1,
        "reservation_status": true,
        "waitlist": false,
        "on_site_7pm": false,
        "on_site_10pm": false,
        "date": null,
        "time": null,
        "beds_reserved": 2,
        "actual_beds_reserved": 2,
        "members_staying": [
            "Thomas Shelby",
            "Arthur Shelby"
        ]
    },
    
**Response:** (200) - log 5 updated 

=========================================================================

DELETE a log: **/logs/:id*

HTTP Method: **[DEL]**
 
**Example:**

Request Body

    {
        "reservation_id": 5,
        "supervisor_id": "00u2lh0bsAliwLEe75d6",
        "family_id": 1,
        "reservation_status": true,
        "waitlist": false,
        "on_site_7pm": false,
        "on_site_10pm": false,
        "date": null,
        "time": null,
        "beds_reserved": 2,
        "actual_beds_reserved": 2,
        "members_staying": [
            "Thomas Shelby",
            "Arthur Shelby"
        ]
    },
    
**Response:** (200) - log 5 deleted

=========================================================================

## Notes (start here)

GET all notes: **/notes**

HTTP Method: **[GET]**

**Example:**

     {
        "id": 1,
        "family_id": 1,
        "author_id": "00u2lgca4zIaSTPqE5d6",
        "subject": "Please be aware of sensitive information",
        "content": "Family came in after fire destroyed their home, young Jacob is still in the recovering.",
        "shareable": true,
        "date": "2020-12-14T05:00:00.000Z",
        "time": "2020-12-14T03:15:31.031Z"
    },
    {
        "id": 2,
        "family_id": 1,
        "author_id": "00u2lgca4zIaSTPqE5d6",
        "subject": "Please be aware of sensitive information",
        "content": "Additional notes for family.",
        "shareable": true,
        "date": "2020-12-14T05:00:00.000Z",
        "time": "2020-12-14T03:15:31.031Z"
    }
    
**Response:** (200) - success

=========================================================================

GET a note: **/notes/:id**

HTTP Method: **[GET]**

**Example:**

     {
        "id": 1,
        "family_id": 1,
        "author_id": "00u2lgca4zIaSTPqE5d6",
        "subject": "Please be aware of sensitive information",
        "content": "Family came in after fire destroyed their home, young Jacob is still in the recovering.",
        "shareable": true,
        "date": "2020-12-14T05:00:00.000Z",
        "time": "2020-12-14T03:15:31.031Z"
    }
    
**Response:** (200) - success

=========================================================================

POST a note: **/notes**

HTTP Method: **[POST]**

**Example:**

     {
        "family_id": 1,
        "author_id": "00u2lgca4zIaSTPqE5d6",
        "subject": "Skills Workshop Information",
        "content": "Family has been given information about skills workshops.",
        "shareable": true,
        "date": "2020-12-14T05:00:00.000Z",
        "time": "2020-12-14T03:15:31.031Z"
    }
    
**Response:** (200) - note created

=========================================================================

PUT (edit) a note: **/notes/:id**

HTTP Method: **[PUT]**

**Example:**

     {
        "id": 1,
        "family_id": 1,
        "author_id": "00u2lgca4zIaSTPqE5d6",
        "subject": "Skills Workshop Information UPDATE",
        "content": "Family has been given information about skills workshops and ongoing support contacts.",
        "shareable": true,
        "date": "2020-12-14T05:00:00.000Z",
        "time": "2020-12-14T03:15:31.031Z"
    }
    
**Response:** (200) - note updated

=========================================================================
DELETE a note: **/notes/:id**

HTTP Method: **[DELETE]**

**Example:**

     {
        "id": 1,
        "family_id": 1,
        "author_id": "00u2lgca4zIaSTPqE5d6",
        "subject": "Skills Workshop Information UPDATE",
        "content": "Family has been given information about skills workshops and ongoing support contacts.",
        "shareable": true,
        "date": "2020-12-14T05:00:00.000Z",
        "time": "2020-12-14T03:15:31.031Z"
    }
    
**Response:** (204) - note deleted

=========================================================================

