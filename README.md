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

GET all logs: **/logs**

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

GET an individual log: **/logs/:id**

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

HTTP Method: **[PUT]**
 
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
    }
    
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

Request Body

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

GET an individual note: **/notes/:id**

HTTP Method: **[GET]**

**Example:**

Request Body

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

Request Body

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

Request Body

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

Request Body

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

## Families (start here)

GET all families: **/families**

HTTP Method: **[GET]**

**Example:**

Request Body

     {
        "id": 1,
        "user_id": "00u2lh0bsAliwLEe75d6",
        "case_number": 22,
        "phone_one": {
            "name": "Thomas Shelby",
            "number": "202-555-0177",
            "safeToLeaveMssg": true
        },
        "phone_two": {
            "name": "Maria Shelby",
            "number": "770-555-0114",
            "safeToLeaveMssg": false
        },
        "safe_alternate": {
            "name": "Mark Shelby",
            "number": "809-323-5959"
        },
        "emergencyContact": {
            "name": "Steve Martin",
            "number": "410-555-0173"
        },
        "vehicle": {
            "make": "BMW",
            "year": 2007,
            "color": "red",
            "model": "K1200LT",
            "license_plate": "699-VHT"
        },
        "last_permanent_address": "7271 Hickory Rd Sterling VA 20164 ",
        "homeless_info": {
            "prior_location": "relatives",
            "current_location": "car",
            "num_times_homeless": 2,
            "total_len_homeless": 1,
            "homeless_start_date": "26-AUG-2019",
            "length_at_prior_location": "2 weeks",
            "length_at_current_location": "3 days"
        },
        "gov_benefits": {
            "RRH": false,
            "snap": true,
            "cps_fps": false,
            "foodstamps": true,
            "housing_voucher": false,
            "veteran_services": true
        },
        "insurance": {
            "pregnancies": false,
            "has_insurance": true,
            "members_covered": 2,
            "health_insurance_type": "Medicare"
        },
        "domestic_violence_info": {
            "fleeing_dv": false,
            "YWCA_contacted": false,
            "has_court_order": false,
            "date_last_incident": false,
            "anonymity_preferred": true
        },
        "pets": {
            "cat": false,
            "dog": false,
            "amount": {
                "value1": false,
                "value2": false
            },
            "shelter": false,
            "name_one": null,
            "name_two": null,
            "service_animal": false,
            "support_animal": false
        },
        "avatar_url": "https://microlancer.lancerassets.com/v2/services/91/166a65bdfc45e5ade4cee71859b871/large_avatar.jpg",
        "percent_complete": 0
    }
    
**Response:** (200) - success

=========================================================================

GET a family: **/families/:id**

HTTP Method: **[GET]**

**Example:**

Request Body

    {
    "id": 1,
    "user_id": "00u2lh0bsAliwLEe75d6",
    "case_number": 22,
    "phone_one": {
        "name": "Thomas Shelby",
        "number": "202-555-0177",
        "safeToLeaveMssg": true
    },
    "phone_two": {
        "name": "Maria Shelby",
        "number": "770-555-0114",
        "safeToLeaveMssg": false
    },
    "safe_alternate": {
        "name": "Mark Shelby",
        "number": "809-323-5959"
    },
    "emergencyContact": {
        "name": "Steve Martin",
        "number": "410-555-0173"
    },
    "vehicle": {
        "make": "BMW",
        "year": 2007,
        "color": "red",
        "model": "K1200LT",
        "license_plate": "699-VHT"
    },
    "last_permanent_address": "7271 Hickory Rd Sterling VA 20164 ",
    "homeless_info": {
        "prior_location": "relatives",
        "current_location": "car",
        "num_times_homeless": 2,
        "total_len_homeless": 1,
        "homeless_start_date": "26-AUG-2019",
        "length_at_prior_location": "2 weeks",
        "length_at_current_location": "3 days"
    },
    "gov_benefits": {
        "RRH": false,
        "snap": true,
        "cps_fps": false,
        "foodstamps": true,
        "housing_voucher": false,
        "veteran_services": true
    },
    "insurance": {
        "pregnancies": false,
        "has_insurance": true,
        "members_covered": 2,
        "health_insurance_type": "Medicare"
    },
    "domestic_violence_info": {
        "fleeing_dv": false,
        "YWCA_contacted": false,
        "has_court_order": false,
        "date_last_incident": false,
        "anonymity_preferred": true
    },
    "pets": {
        "cat": false,
        "dog": false,
        "amount": {
            "value1": false,
            "value2": false
        },
        "shelter": false,
        "name_one": null,
        "name_two": null,
        "service_animal": false,
        "support_animal": false
    },
    "avatar_url": "https://microlancer.lancerassets.com/v2/services/91/166a65bdfc45e5ade4cee71859b871/large_avatar.jpg",
    "percent_complete": 0
    }
    
**Response:** (200) - success

=========================================================================

GET all members of a family: **/families/:id/members**

HTTP Method: **[GET]**

**Example:**

Request Body

     {
        "id": 1,
        "check_in": [
            {
                "waitlist": false,
                "on_site_7pm": false,
                "on_site_10pm": false,
                "reservation_id": 1,
                "reservation_status": true
            }
        ],
        "family_id": 1,
        "date_of_enrollment": "2020-10-09T04:00:00.000Z",
        "household_type": "Adults and Children",
        "length_of_stay": "16 weeks",
        "demographics": {
            "first_name": "Thomas",
            "last_name": "Shelby",
            "gender": "male",
            "relationship": "Dad",
            "DOB": "1-03-1988",
            "SSN": 9999,
            "income": 20000,
            "employer": "union",
            "race": [
                "White"
            ],
            "ethnicity": "Caucasian"
        },
        "barriers": {
            "alcohol_abuse": true,
            "developmental_disabilities": false,
            "chronic_health_issues": false,
            "drug_abuse": false,
            "HIV_AIDs": false,
            "mental_illness": false,
            "physical_disabilities": true,
            "list_indefinite_conditions": "NA",
            "list_issues": "NA"
        },
        "schools": {
            "highest_grade_completed": "12th grade",
            "enrolled_status": false,
            "reason_not_enrolled": "finished",
            "attendance_status": "inactive",
            "school_type": "NA",
            "school_name": "NA",
            "mckinney_school": false
        },
        "case_members": 3,
        "predicted_exit_destination": "permanent exit",
        "flag": null,
        "percent_complete": 0
    },
    {
        "id": 2,
        "check_in": [
            {
                "waitlist": false,
                "on_site_7pm": false,
                "on_site_10pm": false,
                "reservation_id": 1,
                "reservation_status": true
            }
        ],
        "family_id": 1,
        "date_of_enrollment": "2020-10-09T04:00:00.000Z",
        "household_type": "Adults and Children",
        "length_of_stay": "16 weeks",
        "demographics": {
            "first_name": "Jacob",
            "last_name": "Shelby",
            "gender": "female",
            "relationship": "Son",
            "DOB": "10-23-2015",
            "SSN": 9999,
            "income": 20000,
            "employer": null,
            "race": [
                "White"
            ],
            "ethnicity": "Caucasian"
        },
        "barriers": {
            "alcohol_abuse": false,
            "developmental_disabilities": false,
            "chronic_health_issues": false,
            "drug_abuse": false,
            "HIV_AIDs": false,
            "mental_illness": false,
            "physical_disabilities": false,
            "list_indefinite_conditions": "NA",
            "list_issues": "NA"
        },
        "schools": {
            "highest_grade_completed": "Pre-Kindergarten",
            "enrolled_status": true,
            "reason_not_enrolled": "N/A",
            "attendance_status": "active",
            "school_type": "elementary",
            "school_name": "Wright",
            "mckinney_school": false
        },
        "case_members": 3,
        "predicted_exit_destination": "temporary exit",
        "flag": null,
        "percent_complete": 0
    },
    {
        "id": 3,
        "check_in": [
            {
                "waitlist": false,
                "on_site_7pm": false,
                "on_site_10pm": false,
                "reservation_id": 1,
                "reservation_status": true
            }
        ],
        "family_id": 1,
        "date_of_enrollment": "2020-10-09T04:00:00.000Z",
        "household_type": "Adults and Children",
        "length_of_stay": "16 weeks",
        "demographics": {
            "first_name": "Maria",
            "last_name": "Shelby",
            "gender": "female",
            "relationship": "Mom",
            "DOB": "12-03-1992",
            "SSN": 9999,
            "income": 20000,
            "employer": null,
            "race": [
                "White"
            ],
            "ethnicity": "Caucasian"
        },
        "barriers": {
            "alcohol_abuse": false,
            "developmental_disabilities": false,
            "chronic_health_issues": false,
            "drug_abuse": false,
            "HIV_AIDs": false,
            "mental_illness": false,
            "physical_disabilities": false,
            "list_indefinite_conditions": null,
            "list_issues": null
        },
        "schools": {
            "highest_grade_completed": "12th grade",
            "enrolled_status": false,
            "reason_not_enrolled": "finished",
            "attendance_status": "inactive",
            "school_type": null,
            "school_name": null,
            "mckinney_school": false
        },
        "case_members": 3,
        "predicted_exit_destination": "temporary exit",
        "flag": null,
        "percent_complete": 0
    }
    
**Response:** (200) - success

=========================================================================

GET a family by user ID: **/families/user/:id**

HTTP Method: **[GET]**

**Example:**

Request Body

    {
    "id": 1,
    "user_id": "00u2lh0bsAliwLEe75d6",
    "case_number": 22,
    "phone_one": {
        "name": "Thomas Shelby",
        "number": "202-555-0177",
        "safeToLeaveMssg": true
    },
    "phone_two": {
        "name": "Maria Shelby",
        "number": "770-555-0114",
        "safeToLeaveMssg": false
    },
    "safe_alternate": {
        "name": "Mark Shelby",
        "number": "809-323-5959"
    },
    "emergencyContact": {
        "name": "Steve Martin",
        "number": "410-555-0173"
    },
    "vehicle": {
        "make": "BMW",
        "year": 2007,
        "color": "red",
        "model": "K1200LT",
        "license_plate": "699-VHT"
    },
    "last_permanent_address": "7271 Hickory Rd Sterling VA 20164 ",
    "homeless_info": {
        "prior_location": "relatives",
        "current_location": "car",
        "num_times_homeless": 2,
        "total_len_homeless": 1,
        "homeless_start_date": "26-AUG-2019",
        "length_at_prior_location": "2 weeks",
        "length_at_current_location": "3 days"
    },
    "gov_benefits": {
        "RRH": false,
        "snap": true,
        "cps_fps": false,
        "foodstamps": true,
        "housing_voucher": false,
        "veteran_services": true
    },
    "insurance": {
        "pregnancies": false,
        "has_insurance": true,
        "members_covered": 2,
        "health_insurance_type": "Medicare"
    },
    "domestic_violence_info": {
        "fleeing_dv": false,
        "YWCA_contacted": false,
        "has_court_order": false,
        "date_last_incident": false,
        "anonymity_preferred": true
    },
    "pets": {
        "cat": false,
        "dog": false,
        "amount": {
            "value1": false,
            "value2": false
        },
        "shelter": false,
        "name_one": null,
        "name_two": null,
        "service_animal": false,
        "support_animal": false
    },
    "avatar_url": "https://microlancer.lancerassets.com/v2/services/91/166a65bdfc45e5ade4cee71859b871/large_avatar.jpg",
    "percent_complete": 0
    }
    
**Response:** (200) - success

=========================================================================

GET all family household information: **/families/:id/household**

HTTP Method: **[GET]**

**Example:**

Request Body

    {
        "id": 1,
        "user_id": "00u2lh0bsAliwLEe75d6",
        "case_number": 22,
        "phone_one": {
            "name": "Thomas Shelby",
            "number": "202-555-0177",
            "safeToLeaveMssg": true
        },
        "phone_two": {
            "name": "Maria Shelby",
            "number": "770-555-0114",
            "safeToLeaveMssg": false
        },
        "safe_alternate": {
            "name": "Mark Shelby",
            "number": "809-323-5959"
        },
        "emergencyContact": {
            "name": "Steve Martin",
            "number": "410-555-0173"
        },
        "vehicle": {
            "make": "BMW",
            "year": 2007,
            "color": "red",
            "model": "K1200LT",
            "license_plate": "699-VHT"
        },
        "last_permanent_address": "7271 Hickory Rd Sterling VA 20164 ",
        "homeless_info": {
            "prior_location": "relatives",
            "current_location": "car",
            "num_times_homeless": 2,
            "total_len_homeless": 1,
            "homeless_start_date": "26-AUG-2019",
            "length_at_prior_location": "2 weeks",
            "length_at_current_location": "3 days"
        },
        "gov_benefits": {
            "RRH": false,
            "snap": true,
            "cps_fps": false,
            "foodstamps": true,
            "housing_voucher": false,
            "veteran_services": true
        },
        "insurance": {
            "pregnancies": false,
            "has_insurance": true,
            "members_covered": 2,
            "health_insurance_type": "Medicare"
        },
        "domestic_violence_info": {
            "fleeing_dv": false,
            "YWCA_contacted": false,
            "has_court_order": false,
            "date_last_incident": false,
            "anonymity_preferred": true
        },
        "pets": {
            "cat": false,
            "dog": false,
            "amount": {
                "value1": false,
                "value2": false
            },
            "shelter": false,
            "name_one": null,
            "name_two": null,
            "service_animal": false,
            "support_animal": false
        },
        "avatar_url": "https://microlancer.lancerassets.com/v2/services/91/166a65bdfc45e5ade4cee71859b871/large_avatar.jpg",
        "percent_complete": 0,
        "check_in": [
            {
                "waitlist": false,
                "on_site_7pm": false,
                "on_site_10pm": false,
                "reservation_id": 1,
                "reservation_status": true
            }
        ],
        "family_id": 1,
        "date_of_enrollment": "2020-10-09T04:00:00.000Z",
        "household_type": "Adults and Children",
        "length_of_stay": "16 weeks",
        "demographics": {
            "first_name": "Thomas",
            "last_name": "Shelby",
            "gender": "male",
            "relationship": "Dad",
            "DOB": "1-03-1988",
            "SSN": 9999,
            "income": 20000,
            "employer": "union",
            "race": [
                "White"
            ],
            "ethnicity": "Caucasian"
        },
        "barriers": {
            "alcohol_abuse": true,
            "developmental_disabilities": false,
            "chronic_health_issues": false,
            "drug_abuse": false,
            "HIV_AIDs": false,
            "mental_illness": false,
            "physical_disabilities": true,
            "list_indefinite_conditions": "NA",
            "list_issues": "NA"
        },
        "schools": {
            "highest_grade_completed": "12th grade",
            "enrolled_status": false,
            "reason_not_enrolled": "finished",
            "attendance_status": "inactive",
            "school_type": "NA",
            "school_name": "NA",
            "mckinney_school": false
        },
        "case_members": 3,
        "predicted_exit_destination": "permanent exit",
        "flag": null
    },
    {
        "id": 2,
        "user_id": "00u2lh0bsAliwLEe75d6",
        "case_number": 22,
        "phone_one": {
            "name": "Thomas Shelby",
            "number": "202-555-0177",
            "safeToLeaveMssg": true
        },
        "phone_two": {
            "name": "Maria Shelby",
            "number": "770-555-0114",
            "safeToLeaveMssg": false
        },
        "safe_alternate": {
            "name": "Mark Shelby",
            "number": "809-323-5959"
        },
        "emergencyContact": {
            "name": "Steve Martin",
            "number": "410-555-0173"
        },
        "vehicle": {
            "make": "BMW",
            "year": 2007,
            "color": "red",
            "model": "K1200LT",
            "license_plate": "699-VHT"
        },
        "last_permanent_address": "7271 Hickory Rd Sterling VA 20164 ",
        "homeless_info": {
            "prior_location": "relatives",
            "current_location": "car",
            "num_times_homeless": 2,
            "total_len_homeless": 1,
            "homeless_start_date": "26-AUG-2019",
            "length_at_prior_location": "2 weeks",
            "length_at_current_location": "3 days"
        },
        "gov_benefits": {
            "RRH": false,
            "snap": true,
            "cps_fps": false,
            "foodstamps": true,
            "housing_voucher": false,
            "veteran_services": true
        },
        "insurance": {
            "pregnancies": false,
            "has_insurance": true,
            "members_covered": 2,
            "health_insurance_type": "Medicare"
        },
        "domestic_violence_info": {
            "fleeing_dv": false,
            "YWCA_contacted": false,
            "has_court_order": false,
            "date_last_incident": false,
            "anonymity_preferred": true
        },
        "pets": {
            "cat": false,
            "dog": false,
            "amount": {
                "value1": false,
                "value2": false
            },
            "shelter": false,
            "name_one": null,
            "name_two": null,
            "service_animal": false,
            "support_animal": false
        },
        "avatar_url": "https://microlancer.lancerassets.com/v2/services/91/166a65bdfc45e5ade4cee71859b871/large_avatar.jpg",
        "percent_complete": 0,
        "check_in": [
            {
                "waitlist": false,
                "on_site_7pm": false,
                "on_site_10pm": false,
                "reservation_id": 1,
                "reservation_status": true
            }
        ],
        "family_id": 1,
        "date_of_enrollment": "2020-10-09T04:00:00.000Z",
        "household_type": "Adults and Children",
        "length_of_stay": "16 weeks",
        "demographics": {
            "first_name": "Jacob",
            "last_name": "Shelby",
            "gender": "female",
            "relationship": "Son",
            "DOB": "10-23-2015",
            "SSN": 9999,
            "income": 20000,
            "employer": null,
            "race": [
                "White"
            ],
            "ethnicity": "Caucasian"
        },
        "barriers": {
            "alcohol_abuse": false,
            "developmental_disabilities": false,
            "chronic_health_issues": false,
            "drug_abuse": false,
            "HIV_AIDs": false,
            "mental_illness": false,
            "physical_disabilities": false,
            "list_indefinite_conditions": "NA",
            "list_issues": "NA"
        },
        "schools": {
            "highest_grade_completed": "Pre-Kindergarten",
            "enrolled_status": true,
            "reason_not_enrolled": "N/A",
            "attendance_status": "active",
            "school_type": "elementary",
            "school_name": "Wright",
            "mckinney_school": false
        },
        "case_members": 3,
        "predicted_exit_destination": "temporary exit",
        "flag": null
    },
    {
        "id": 3,
        "user_id": "00u2lh0bsAliwLEe75d6",
        "case_number": 22,
        "phone_one": {
            "name": "Thomas Shelby",
            "number": "202-555-0177",
            "safeToLeaveMssg": true
        },
        "phone_two": {
            "name": "Maria Shelby",
            "number": "770-555-0114",
            "safeToLeaveMssg": false
        },
        "safe_alternate": {
            "name": "Mark Shelby",
            "number": "809-323-5959"
        },
        "emergencyContact": {
            "name": "Steve Martin",
            "number": "410-555-0173"
        },
        "vehicle": {
            "make": "BMW",
            "year": 2007,
            "color": "red",
            "model": "K1200LT",
            "license_plate": "699-VHT"
        },
        "last_permanent_address": "7271 Hickory Rd Sterling VA 20164 ",
        "homeless_info": {
            "prior_location": "relatives",
            "current_location": "car",
            "num_times_homeless": 2,
            "total_len_homeless": 1,
            "homeless_start_date": "26-AUG-2019",
            "length_at_prior_location": "2 weeks",
            "length_at_current_location": "3 days"
        },
        "gov_benefits": {
            "RRH": false,
            "snap": true,
            "cps_fps": false,
            "foodstamps": true,
            "housing_voucher": false,
            "veteran_services": true
        },
        "insurance": {
            "pregnancies": false,
            "has_insurance": true,
            "members_covered": 2,
            "health_insurance_type": "Medicare"
        },
        "domestic_violence_info": {
            "fleeing_dv": false,
            "YWCA_contacted": false,
            "has_court_order": false,
            "date_last_incident": false,
            "anonymity_preferred": true
        },
        "pets": {
            "cat": false,
            "dog": false,
            "amount": {
                "value1": false,
                "value2": false
            },
            "shelter": false,
            "name_one": null,
            "name_two": null,
            "service_animal": false,
            "support_animal": false
        },
        "avatar_url": "https://microlancer.lancerassets.com/v2/services/91/166a65bdfc45e5ade4cee71859b871/large_avatar.jpg",
        "percent_complete": 0,
        "check_in": [
            {
                "waitlist": false,
                "on_site_7pm": false,
                "on_site_10pm": false,
                "reservation_id": 1,
                "reservation_status": true
            }
        ],
        "family_id": 1,
        "date_of_enrollment": "2020-10-09T04:00:00.000Z",
        "household_type": "Adults and Children",
        "length_of_stay": "16 weeks",
        "demographics": {
            "first_name": "Maria",
            "last_name": "Shelby",
            "gender": "female",
            "relationship": "Mom",
            "DOB": "12-03-1992",
            "SSN": 9999,
            "income": 20000,
            "employer": null,
            "race": [
                "White"
            ],
            "ethnicity": "Caucasian"
        },
        "barriers": {
            "alcohol_abuse": false,
            "developmental_disabilities": false,
            "chronic_health_issues": false,
            "drug_abuse": false,
            "HIV_AIDs": false,
            "mental_illness": false,
            "physical_disabilities": false,
            "list_indefinite_conditions": null,
            "list_issues": null
        },
        "schools": {
            "highest_grade_completed": "12th grade",
            "enrolled_status": false,
            "reason_not_enrolled": "finished",
            "attendance_status": "inactive",
            "school_type": null,
            "school_name": null,
            "mckinney_school": false
        },
        "case_members": 3,
        "predicted_exit_destination": "temporary exit",
        "flag": null
    }
    
**Response:** (200) - success

=========================================================================

GET all notes of a family: **/families/:id/notes**

HTTP Method: **[GET]**

**Example:**

Request Body

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

GET all logs of a family: **/families/:id/logs**

HTTP Method: **[GET]**

**Example:**

Request Body

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
    }
    
**Response:** (200) - success

=========================================================================

POST a family: **/families**

HTTP Method: **[POST]**
 
**Example:**

Request Body

     {
        "user_id": "00u2lh0bsAliwLEe75d6",
        "case_number": 22,
        "phone_one": {
            "name": "Thomas Shelby",
            "number": "202-555-0177",
            "safeToLeaveMssg": true
        },
        "phone_two": {
            "name": "Maria Shelby",
            "number": "770-555-0114",
            "safeToLeaveMssg": false
        },
        "safe_alternate": {
            "name": "Mark Shelby",
            "number": "809-323-5959"
        },
        "emergencyContact": {
            "name": "Steve Martin",
            "number": "410-555-0173"
        },
        "vehicle": {
            "make": "BMW",
            "year": 2007,
            "color": "red",
            "model": "K1200LT",
            "license_plate": "699-VHT"
        },
        "last_permanent_address": "7271 Hickory Rd Sterling VA 20164 ",
        "homeless_info": {
            "prior_location": "relatives",
            "current_location": "car",
            "num_times_homeless": 2,
            "total_len_homeless": 1,
            "homeless_start_date": "26-AUG-2019",
            "length_at_prior_location": "2 weeks",
            "length_at_current_location": "3 days"
        },
        "gov_benefits": {
            "RRH": false,
            "snap": true,
            "cps_fps": false,
            "foodstamps": true,
            "housing_voucher": false,
            "veteran_services": true
        },
        "insurance": {
            "pregnancies": false,
            "has_insurance": true,
            "members_covered": 2,
            "health_insurance_type": "Medicare"
        },
        "domestic_violence_info": {
            "fleeing_dv": false,
            "YWCA_contacted": false,
            "has_court_order": false,
            "date_last_incident": false,
            "anonymity_preferred": true
        },
        "pets": {
            "cat": false,
            "dog": false,
            "amount": {
                "value1": false,
                "value2": false
            },
            "shelter": false,
            "name_one": null,
            "name_two": null,
            "service_animal": false,
            "support_animal": false
        },
        "avatar_url": "https://microlancer.lancerassets.com/v2/services/91/166a65bdfc45e5ade4cee71859b871/large_avatar.jpg",
        "percent_complete": 0
    }
    
**Response:** (200) - family created

=========================================================================

PUT (edit) a family: **/families/:id**

HTTP Method: **[PUT]**

**Example:**

Request Body

        {
        "id": 1,
        "user_id": "00u2lh0bsAliwLEe75d6",
        "case_number": 22,
        "phone_one": {
            "name": "Thomas Shelby",
            "number": "202-555-0177",
            "safeToLeaveMssg": true
        },
        "phone_two": {
            "name": "Maria Shelby",
            "number": "770-555-0114",
            "safeToLeaveMssg": false
        },
        "safe_alternate": {
            "name": "Mark Shelby",
            "number": "809-323-5959"
        },
        "emergencyContact": {
            "name": "Steve Martin",
            "number": "410-555-0173"
        },
        "vehicle": {
            "make": "BMW",
            "year": 2007,
            "color": "red",
            "model": "K1200LT",
            "license_plate": "699-VHT"
        },
        "last_permanent_address": "7271 Hickory Rd Sterling VA 20164 ",
        "homeless_info": {
            "prior_location": "relatives",
            "current_location": "car",
            "num_times_homeless": 2,
            "total_len_homeless": 1,
            "homeless_start_date": "26-AUG-2019",
            "length_at_prior_location": "2 weeks",
            "length_at_current_location": "3 days"
        },
        "gov_benefits": {
            "RRH": false,
            "snap": true,
            "cps_fps": false,
            "foodstamps": true,
            "housing_voucher": false,
            "veteran_services": true
        },
        "insurance": {
            "pregnancies": false,
            "has_insurance": true,
            "members_covered": 2,
            "health_insurance_type": "Medicare"
        },
        "domestic_violence_info": {
            "fleeing_dv": false,
            "YWCA_contacted": false,
            "has_court_order": false,
            "date_last_incident": false,
            "anonymity_preferred": true
        },
        "pets": {
            "cat": false,
            "dog": false,
            "amount": {
                "value1": false,
                "value2": false
            },
            "shelter": false,
            "name_one": null,
            "name_two": null,
            "service_animal": false,
            "support_animal": false
        },
        "avatar_url": "https://microlancer.lancerassets.com/v2/services/91/166a65bdfc45e5ade4cee71859b871/large_avatar.jpg",
        "percent_complete": 0
    }
    
**Response:** (200) - family updated

=========================================================================

DELETE a family: **/families/:id**

HTTP Method: **[DELETE]**

**Example:**

Request Body

    {
    "id": 1,
    "user_id": "00u2lh0bsAliwLEe75d6",
    "case_number": 22,
    "phone_one": {
        "name": "Thomas Shelby",
        "number": "202-555-0177",
        "safeToLeaveMssg": true
    },
    "phone_two": {
        "name": "Maria Shelby",
        "number": "770-555-0114",
        "safeToLeaveMssg": false
    },
    "safe_alternate": {
        "name": "Mark Shelby",
        "number": "809-323-5959"
    },
    "emergencyContact": {
        "name": "Steve Martin",
        "number": "410-555-0173"
    },
    "vehicle": {
        "make": "BMW",
        "year": 2007,
        "color": "red",
        "model": "K1200LT",
        "license_plate": "699-VHT"
    },
    "last_permanent_address": "7271 Hickory Rd Sterling VA 20164 ",
    "homeless_info": {
        "prior_location": "relatives",
        "current_location": "car",
        "num_times_homeless": 2,
        "total_len_homeless": 1,
        "homeless_start_date": "26-AUG-2019",
        "length_at_prior_location": "2 weeks",
        "length_at_current_location": "3 days"
    },
    "gov_benefits": {
        "RRH": false,
        "snap": true,
        "cps_fps": false,
        "foodstamps": true,
        "housing_voucher": false,
        "veteran_services": true
    },
    "insurance": {
        "pregnancies": false,
        "has_insurance": true,
        "members_covered": 2,
        "health_insurance_type": "Medicare"
    },
    "domestic_violence_info": {
        "fleeing_dv": false,
        "YWCA_contacted": false,
        "has_court_order": false,
        "date_last_incident": false,
        "anonymity_preferred": true
    },
    "pets": {
        "cat": false,
        "dog": false,
        "amount": {
            "value1": false,
            "value2": false
        },
        "shelter": false,
        "name_one": null,
        "name_two": null,
        "service_animal": false,
        "support_animal": false
    },
    "avatar_url": "https://microlancer.lancerassets.com/v2/services/91/166a65bdfc45e5ade4cee71859b871/large_avatar.jpg",
    "percent_complete": 0
    }
    
**Response:** (204) - family 1 was deleted

=========================================================================
## BEDS (start here)
GET all beds : **/beds**

HTTP Method: **[GET]**

**Example:**

Request Body

    {
        "id": 1,
        "total_beds": null
    }
    
**Response:** (200) - success


=========================================================================

PUT to update beds : **/beds**

HTTP Method: **[PUT]**

**Example:**

Request Body

    {
        "id": 1,
        "total_beds": 6
    }
    
**Response:** (200) - success


=========================================================================

## MEMBERS (start here)

GET a member: **/members**

HTTP Method: **[GET]**

**Example:**

Request Body

    
      [
    {
        "id": 2,
        "check_in": [
            {
                "waitlist": false,
                "on_site_7pm": false,
                "on_site_10pm": false,
                "reservation_id": 1,
                "reservation_status": true
            }
        ],
        "family_id": 1,
        "date_of_enrollment": "2020-10-09T04:00:00.000Z",
        "household_type": "Adults and Children",
        "length_of_stay": "16 weeks",
        "demographics": {
            "first_name": "Jacob",
            "last_name": "Shelby",
            "gender": "female",
            "relationship": "Son",
            "DOB": "10-23-2015",
            "SSN": 9999,
            "income": 20000,
            "employer": null,
            "race": [
                "White"
            ],
            "ethnicity": "Caucasian"
        },
        "barriers": {
            "alcohol_abuse": false,
            "developmental_disabilities": false,
            "chronic_health_issues": false,
            "drug_abuse": false,
            "HIV_AIDs": false,
            "mental_illness": false,
            "physical_disabilities": false,
            "list_indefinite_conditions": "NA",
            "list_issues": "NA"
        },
        "schools": {
            "highest_grade_completed": "Pre-Kindergarten",
            "enrolled_status": true,
            "reason_not_enrolled": "N/A",
            "attendance_status": "active",
            "school_type": "elementary",
            "school_name": "Wright",
            "mckinney_school": false
        },
        "case_members": 3,
        "predicted_exit_destination": "temporary exit",
        "flag": null,
        "percent_complete": 0
    },
    {
        "id": 3,
        "check_in": [
            {
                "waitlist": false,
                "on_site_7pm": false,
                "on_site_10pm": false,
                "reservation_id": 1,
                "reservation_status": true
            }
        ],
        "family_id": 1,
        "date_of_enrollment": "2020-10-09T04:00:00.000Z",
        "household_type": "Adults and Children",
        "length_of_stay": "16 weeks",
        "demographics": {
            "first_name": "Kai",
            "last_name": "Benton",
            "gender": "female",
            "relationship": "Mom",
            "DOB": "12-03-1992",
            "SSN": 9999,
            "income": 20000,
            "employer": null,
            "race": [
                "White"
            ],
            "ethnicity": "Caucasian"
        },
        "barriers": {
            "alcohol_abuse": false,
            "developmental_disabilities": false,
            "chronic_health_issues": false,
            "drug_abuse": false,
            "HIV_AIDs": false,
            "mental_illness": false,
            "physical_disabilities": false,
            "list_indefinite_conditions": null,
            "list_issues": null
        },
        "schools": {
            "highest_grade_completed": "12th grade",
            "enrolled_status": false,
            "reason_not_enrolled": "finished",
            "attendance_status": "inactive",
            "school_type": null,
            "school_name": null,
            "mckinney_school": false
        },
        "case_members": 3,
        "predicted_exit_destination": "temporary exit",
        "flag": null,
        "percent_complete": 0
    },
    {
        "id": 1,
        "check_in": [
            {
                "waitlist": false,
                "on_site_7pm": true,
                "on_site_10pm": true,
                "reservation_id": 1,
                "reservation_status": false
            },
            {
                "waitlist": true,
                "on_site_7pm": false,
                "on_site_10pm": false,
                "reservation_id": 1,
                "reservation_status": true
            }
        ],
        "family_id": 1,
        "date_of_enrollment": "2020-10-09T04:00:00.000Z",
        "household_type": "Adults and Children",
        "length_of_stay": "16 weeks",
        "demographics": {
            "first_name": "Thomas",
            "last_name": "Shelby",
            "gender": "male",
            "relationship": "Dad",
            "DOB": "1-03-1988",
            "SSN": 9999,
            "income": 20000,
            "employer": "union",
            "race": [
                "White"
            ],
            "ethnicity": "Caucasian"
        },
        "barriers": {
            "alcohol_abuse": true,
            "developmental_disabilities": false,
            "chronic_health_issues": false,
            "drug_abuse": false,
            "HIV_AIDs": false,
            "mental_illness": false,
            "physical_disabilities": true,
            "list_indefinite_conditions": "NA",
            "list_issues": "NA"
        },
        "schools": {
            "highest_grade_completed": "12th grade",
            "enrolled_status": false,
            "reason_not_enrolled": "finished",
            "attendance_status": "inactive",
            "school_type": "NA",
            "school_name": "NA",
            "mckinney_school": false
        },
        "case_members": 3,
        "predicted_exit_destination": "Permanent Exit",
        "flag": null,
        "percent_complete": 0
    }
]

**Response:** (200) - success

=========================================================================

GET a member by ID: **/members/:id**
HTTP Method: **[GET]**

**Example:**
 
Request Body

    {
          "id": 1,
    "check_in": [
        {
            "waitlist": false,
            "on_site_7pm": true,
            "on_site_10pm": true,
            "reservation_id": 1,
            "reservation_status": false
        },
        {
            "waitlist": true,
            "on_site_7pm": false,
            "on_site_10pm": false,
            "reservation_id": 1,
            "reservation_status": true
        }
    ],
    "family_id": 1,
    "date_of_enrollment": "2020-10-09T04:00:00.000Z",
    "household_type": "Adults and Children",
    "length_of_stay": "16 weeks",
    "demographics": {
        "first_name": "Thomas",
        "last_name": "Shelby",
        "gender": "male",
        "relationship": "Dad",
        "DOB": "1-03-1988",
        "SSN": 9999,
        "income": 20000,
        "employer": "union",
        "race": [
            "White"
        ],
        "ethnicity": "Caucasian"
    },
    "barriers": {
        "alcohol_abuse": true,
        "developmental_disabilities": false,
        "chronic_health_issues": false,
        "drug_abuse": false,
        "HIV_AIDs": false,
        "mental_illness": false,
        "physical_disabilities": true,
        "list_indefinite_conditions": "NA",
        "list_issues": "NA"
    },
    "schools": {
        "highest_grade_completed": "12th grade",
        "enrolled_status": false,
        "reason_not_enrolled": "finished",
        "attendance_status": "inactive",
        "school_type": "NA",
        "school_name": "NA",
        "mckinney_school": false
    },
    "case_members": 3,
    "predicted_exit_destination": "Permanent Exit",
    "flag": null,
    "percent_complete": 0
    }
      
**Response:** (200) - success

=========================================================================

POST a member: **/members**

HTTP Method: **[POST]**

**Example:**

Request Body

        {
        "message": "member created",
    "member": {
        "id": 4,
        "check_in": [
            {
                "waitlist": true,
                "on_site_7pm": false,
                "on_site_10pm": false,
                "reservation_id": 1,
                "reservation_status": true
            }
        ],
        "family_id": 1,
        "date_of_enrollment": "2020-10-09T04:00:00.000Z",
        "household_type": "Adults and Teenagers",
        "length_of_stay": "16 weeks",
        "demographics": {
            "first_name": "Brad",
            "last_name": "Pitt",
            "gender": "female",
            "relationship": "Mom",
            "DOB": "12-03-1992",
            "SSN": 9999,
            "income": 20000,
            "employer": null,
            "race": [
                "White"
            ],
            "ethnicity": "Caucasian"
        },
        "barriers": {
            "alcohol_abuse": false,
            "developmental_disabilities": false,
            "chronic_health_issues": false,
            "drug_abuse": false,
            "HIV_AIDs": false,
            "mental_illness": false,
            "physical_disabilities": false,
            "list_indefinite_conditions": null,
            "list_issues": null
        },
        "schools": {
            "highest_grade_completed": "12th grade",
            "enrolled_status": false,
            "reason_not_enrolled": "finished",
            "attendance_status": "inactive",
            "school_type": null,
            "school_name": null,
            "mckinney_school": false
        },
        "case_members": 3,
        "predicted_exit_destination": "temporary exit",
        "flag": null,
        "percent_complete": 0
    }
    }

**Response:** (200) - success

=========================================================================

DELETE a member by id: **/members/:id**

HTTP Method: **[DELETE]**

**Example:**

Request Body

       {
    "message": "member '4' was deleted.",
    "members": {
        "id": 4,
        "check_in": [
            {
                "waitlist": true,
                "on_site_7pm": false,
                "on_site_10pm": false,
                "reservation_id": 1,
                "reservation_status": true
            }
        ],
        "family_id": 1,
        "date_of_enrollment": "2020-10-09T04:00:00.000Z",
        "household_type": "Adults and Teenagers",
        "length_of_stay": "16 weeks",
        "demographics": {
            "first_name": "Brad",
            "last_name": "Pitt",
            "gender": "female",
            "relationship": "Mom",
            "DOB": "12-03-1992",
            "SSN": 9999,
            "income": 20000,
            "employer": null,
            "race": [
                "White"
            ],
            "ethnicity": "Caucasian"
        },
        "barriers": {
            "alcohol_abuse": false,
            "developmental_disabilities": false,
            "chronic_health_issues": false,
            "drug_abuse": false,
            "HIV_AIDs": false,
            "mental_illness": false,
            "physical_disabilities": false,
            "list_indefinite_conditions": null,
            "list_issues": null
        },
        "schools": {
            "highest_grade_completed": "12th grade",
            "enrolled_status": false,
            "reason_not_enrolled": "finished",
            "attendance_status": "inactive",
            "school_type": null,
            "school_name": null,
            "mckinney_school": false
        },
        "case_members": 3,
        "predicted_exit_destination": "temporary exit",
        "flag": null,
        "percent_complete": 0
    }
           
    }
    
**Response:** (200) - success
 
=========================================================================

## USERS (start here)    

GET current user: **/users/me**

HTTP Method: **[GET]**

**Example:**

Request Body

        {
            "user": {
        "id": "00u2lhigtb8N47Jii5d6",
        "email": "supervisor@gmail.com",
        "first_name": "Arthur",
        "last_name": "Shelby",
        "role": "supervisor"
       }
    }
    
**Response:** (200) - success

=========================================================================


GET all users: **/users**

HTTP Method: **[GET]**

**Example:**

Request Body

        [
          {
        "id": "00u2lgpiiPT4y3njs5d6",
        "email": "executivedirector@gmail.com",
        "first_name": "Freddie",
        "last_name": "Thorne",
        "role": "executive_director"
    },
    {
        "id": "00u2lhigtb8N47Jii5d6",
        "email": "supervisor@gmail.com",
        "first_name": "Arthur",
        "last_name": "Shelby",
        "role": "supervisor"
    },
    {
        "id": "00u2lgca4zIaSTPqE5d6",
        "email": "casemanager@gmail.com",
        "first_name": "Linda",
        "last_name": "Shelby",
        "role": "case_manager"
    },
    {
        "id": "00u2lh0bsAliwLEe75d6",
        "email": "guest@gmail.com",
        "first_name": "Thomas",
        "last_name": "Shelby",
        "role": "guest"
    },
    {
        "id": "00u2lhpc533MESNSA5d6",
        "email": "pending@gmail.com",
        "first_name": "Ruby",
        "last_name": "Rose",
        "role": "pending"
    },
    {
        "id": "00u2lhpc533MESNSA5b7",
        "email": "guest2@gmail.com",
        "first_name": "Rain",
        "last_name": "Williams",
        "role": "guest"
    }
    ]
    
    
**Response:** (200) - OK

=========================================================================

POST a user: **/users/**

HTTP Method: **[POST]**

**Example:**
POST Body

      {
        "id": "2",
        "email": "Cameronl@gmail.com",
        "first_name": "Cameron",
        "last_name": "Lares",
        "role": "supervisor"
      }
    

Request Body

        {
            "message": "Profile created"
    }
    
    
**Response:** (201) - success

=========================================================================

GET all users by id: **/users/:id**

HTTP Method: **[GET]**

**Example:**

Request Body

      {
    "id": "2",
    "email": "Cameronl@gmail.com",
    "first_name": "Cameron",
    "last_name": "Lares",
    "role": "supervisor"
    }
    
**Response:** (200) - success

=========================================================================

GET family by user id: **/:id/family**

HTTP Method: **[GET]**

**Example:**

Request Body

        {
    
    }
    
**Response:** (200) - success

=========================================================================

UPDATE user by id: **/users/:id/**

HTTP Method: **[PUT]**

**Cannot update user id or role**
 
**Example:**

Request Body

        {
    "message": "profile updated",
    "profile": {
        "id": "2",
        "email": "updatedcam@gmail.com",
        "first_name": "Cam",
        "last_name": "L",
        "role": "supervisor"
        } 
    }
    
    
**Response:** (200) - success 

=========================================================================

DELETE user by id: **/users/:id**

HTTP Method: **[DELETE]**

**Example:**

Request Body

    {
       
    }
    
**Response:** (200) - success
