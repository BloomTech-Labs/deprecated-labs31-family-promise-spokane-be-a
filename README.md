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

## Logs

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

Get a log: **/logs/:id**

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


## Login

Login a user to:  **/api/auth/login**
HTTP Method: **[POST]**

**Body:**
```
| name      | type   | required | description                         |  
| --------  | ------ | ------- | ----------------------------------   |
| username  | String | Yes      | Must be unique/ Must be less than 100 chars |
| password  | String | Yes      | Must be unique/ Must be less than 100 chars |
```
 
**Example:**
```
    {
        "id": 1,
        "username": "TJ",
        "password": "password"
    }
```

**Response:** (200) - ok

(400) - unauthorized
```
{
    "message": "bad credentials"
}
```

=========================================================================

## Users Endpoints (start here)

GET a user by: **/api/users/**
HTTP Method: **[GET]**

**Body:**
```
| name      | type   | required | description                         |  
| --------  | ------ | ------- | ----------------------------------   |
| username  | String | Yes      | Must be unique/ Must be less than 100 chars |
| password  | String | Yes      | Must be unique/ Must be less than 100 chars |
```
 
**Example:**
```
    {
        "id": 1,
        "username": "Jake",
        "password": "password"
    }
```

**Response:** (200) - ok

=========================================================================

GET a user by ID: **/api/users/:id**
HTTP Method: **[GET]**

**Body:**
```
| name      | type   | required | description                         |  
| --------  | ------ | ------- | ----------------------------------   |
| username  | String | Yes      | Must be unique/ Must be less than 100 chars |
| password  | String | Yes      | Must be unique/ Must be less than 100 chars |
```
 
**Example:**
```
    {
        "id": 1,
        "username": "Jake",
        "password": "password"
    }
```

**Response:** (200) - ok

=========================================================================

PUT a user by: **/api/users/:id**
HTTP Method: **[PUT]**

**Body:**
```
| name      | type   | required | description                         |  
| --------  | ------ | ------- | ----------------------------------   |
| username  | String | Yes      | Must be unique/ Must be less than 100 chars |
| password  | String | Yes      | Must be unique/ Must be less than 100 chars |
```
 
**Example:**
```
    {
        "id": 1,
        "username": "Jake",
        "password": "password"
    }
```

**Response:** (200) - updated user information

=========================================================================

DELETE a user by ID: **/api/users/:id**
HTTP Method: **[DEL]**

**Body:**
```
| name      | type   | required | description                         |  
| --------  | ------ | ------- | ----------------------------------   |
| username  | String | Yes      | Must be unique/ Must be less than 100 chars |
| password  | String | Yes      | Must be unique/ Must be less than 100 chars |
```
 
**Example:**
```
    {
        "id": 1,
        "username": "Jake",
        "password": "password"
    }
```

**Response:** (200) - deleted user information

=========================================================================

GET a user with events: **/api/users/:id/events**
HTTP Method: **[GET]**

**Body:**
```
| name      | type   | required | description                         |  
| --------  | ------ | ------- | ----------------------------------   |
| username  | String | Yes      | Must be unique/ Must be less than 100 chars |
| password  | String | Yes      | Must be unique/ Must be less than 100 chars |
```
```
| name       | type    | required | description 
| ---------- | ------  | -------- | ------------------------------------ |
| event_name | String  | No       | Must be unique/ Must be less than 200 chars |
| time       | String  | No       | Must be unique/ Must be less than 200 chars |
| address    | String  | No       | Must be unique/ Must be less than 200 chars |
| dates      | String  | No       | Must be unique/ Must be less than 200 chars |
| guests     | String  | No       | Must be unique/ Must be less than 200 chars |
| users_id   | Integer | NO       | Must be unique/ Must be less than 200 chars |
```
 
**Example:**
```
   {
    "id": 2,
    "username": "Jake",
    "password": "password",
    "events": [
        {
            "id": 1,
            "event_name": "Fairmount Park Meet Up",
            "time": "10:00am",
            "address": "Fairmount Park, Philadelphia",
            "dates": "11-20-20",
            "guests": "TJ, Alden, Jake, Cory",
            "users_id": 2
        }
    ]
}
```

**Response:** (200) - (given view)

=========================================================================


### Events Endpoints (start here)

POST a new event by: **/api/events/**
HTTP Method: **[POST]**

**Body:**
```
| name       | type    | required | description 
| ---------- | ------  | -------- | ------------------------------------ |
| event_name | String  | No       | Must be unique/ Must be less than 200 chars |
| time       | String  | No       | Must be unique/ Must be less than 200 chars |
| address    | String  | No       | Must be unique/ Must be less than 200 chars |
| dates      | String  | No       | Must be unique/ Must be less than 200 chars |
| guests     | String  | No       | Must be unique/ Must be less than 200 chars |
| users_id   | Integer | NO       | Must be unique/ Must be less than 200 chars |
```
 
**Example:**
```
    [
    {
        "id": 1,
        "event_name": "Fairmount Park Meet Up",
        "time": "10:00am",
        "address": "Fairmount Park, Philadelphia",
        "dates": "11-20-20",
        "guests": "TJ, Alden, Jake, Cory",
        "users_id": 2
    }
]
```

**Response:** (200) - event created successfully

=========================================================================

GET all events by: **/api/events/**
HTTP Method: **[GET]**

**Body:**
```
| name       | type    | required | description 
| ---------- | ------  | -------- | ------------------------------------ |
| event_name | String  | No       | Must be unique/ Must be less than 200 chars |
| time       | String  | No       | Must be unique/ Must be less than 200 chars |
| address    | String  | No       | Must be unique/ Must be less than 200 chars |
| dates      | String  | No       | Must be unique/ Must be less than 200 chars |
| guests     | String  | No       | Must be unique/ Must be less than 200 chars |
| users_id   | Integer | NO       | Must be unique/ Must be less than 200 chars |
```
 
**Example:**
```
[
    {
        "id": 1,
        "event_name": "Fairmount Park Meet Up",
        "time": "10:00am",
        "address": "Fairmount Park, Philadelphia",
        "dates": "11-20-20",
        "guests": "TJ, Alden, Jake, Cory",
        "users_id": 2
    }
]
```

**Response:** (200)

=========================================================================

GET events by ID:  **/api/events/:id**
HTTP Method: **[GET]**

**Body:**
```
| name       | type    | required | description 
| ---------- | ------  | -------- | ------------------------------------ |
| event_name | String  | No       | Must be unique/ Must be less than 200 chars |
| time       | String  | No       | Must be unique/ Must be less than 200 chars |
| address    | String  | No       | Must be unique/ Must be less than 200 chars |
| dates      | String  | No       | Must be unique/ Must be less than 200 chars |
| guests     | String  | No       | Must be unique/ Must be less than 200 chars |
| users_id   | Integer | NO       | Must be unique/ Must be less than 200 chars |
```
 
**Example:**
```
[
    {
        "id": 1,
        "event_name": "Fairmount Park Meet Up",
        "time": "10:00am",
        "address": "Fairmount Park, Philadelphia",
        "dates": "11-20-20",
        "guests": "TJ, Alden, Jake, Cory",
        "users_id": 2
    }
]
```

**Response:** (200)

=========================================================================

PUT events by: **/api/events/:id**
HTTP Method: **[PUT]**

**Body:**
```
| name       | type    | required | description 
| ---------- | ------  | -------- | ------------------------------------ |
| event_name | String  | No       | Must be unique/ Must be less than 200 chars |
| time       | String  | No       | Must be unique/ Must be less than 200 chars |
| address    | String  | No       | Must be unique/ Must be less than 200 chars |
| dates      | String  | No       | Must be unique/ Must be less than 200 chars |
| guests     | String  | No       | Must be unique/ Must be less than 200 chars |
| users_id   | Integer | NO       | Must be unique/ Must be less than 200 chars |
```
 
**Example:**
```
[
    {
        "id": 2,
        "event_name": "Thanksgiving Food Drive 2020",
        "time": "10:00am",
        "address": "Phoenix, Arizona",
        "dates": "11-20-20",
        "guests": "TJ, Alden, Jake, Cory",
        "users_id": 2
    }
]
```

**Response:** (200)

=========================================================================

DELETE events by: **/api/events/:id**
HTTP Method: **[DEL]**

**Body:**
```
| name       | type    | required | description 
| ---------- | ------  | -------- | ------------------------------------ |
| event_name | String  | No       | Must be unique/ Must be less than 200 chars |
| time       | String  | No       | Must be unique/ Must be less than 200 chars |
| address    | String  | No       | Must be unique/ Must be less than 200 chars |
| dates      | String  | No       | Must be unique/ Must be less than 200 chars |
| guests     | String  | No       | Must be unique/ Must be less than 200 chars |
| users_id   | Integer | NO       | Must be unique/ Must be less than 200 chars |
```
 
**Example:**
```
[
    {
        "id": 2,
        "event_name": "Thanksgiving Food Drive 2020",
        "time": "10:00am",
        "address": "Phoenix, Arizona",
        "dates": "11-20-20",
        "guests": "TJ, Alden, Jake, Cory",
        "users_id": 2
    }
]
```

**Response:** (200) - event successfully deleted

=========================================================================


### Food Endpoints (start here)

GET all food items by: **/api/foods/**
HTTP Method: **[GET]**

**Body:**
```
| name       | type    | required | description 
| ---------- | ------  | -------- | ---------------------         |
| food_item  | String  | Yes      |  Must be less than 100 chars  |
| events_id  | integer | Yes      |  Must be less than 100 chars  |
| completed  | boolean | Yes      |  Must be 0(false) or 1(true)  | 
```
 
**Example:**
```
[
    {
        "id": 1,
        "food_item": "Ketchup",
        "events_id": 2,
        "completed": 0
    },
    {
        "id": 2,
        "food_item": "Mustard",
        "events_id": 2,
        "completed": 0
    },
    {
        "id": 3,
        "food_item": "Burger",
        "events_id": 1,
        "completed": 1
    }
]
```

**Response:** (200)

=========================================================================

GET a food item by ID: **/api/foods/:id**
HTTP Method: **[GET]**

**Body:**
```
| name       | type    | required | description 
| ---------- | ------  | -------- | ---------------------         |
| food_item  | String  | Yes      |  Must be less than 100 chars  |
| events_id  | integer | Yes      |  Must be less than 100 chars  |
| completed  | boolean | Yes      |  Must be 0(false) or 1(true)  | 
```
 
**Example:**
```
[
    {
        "id": 2,
        "food_item": "Mustard",
        "events_id": 2,
        "completed": 0
    }
]
```

**Response:** (200) - view given

=========================================================================

POST a food item by: **/api/foods/**
HTTP Method: **[POST]**

**Body:**
```
| name       | type    | required | description 
| ---------- | ------  | -------- | ---------------------         |
| food_item  | String  | Yes      |  Must be less than 100 chars  |
| events_id  | integer | Yes      |  Must be less than 100 chars  |
| completed  | boolean | Yes      |  Must be 0(false) or 1(true)  | 
```
 
**Example:**
```
[
    {
        "id": 2,
        "food_item": "Ketchup",
        "events_id": 2,
        "completed": 0
    }
]
```

**Response:** (200) - Food item successfully created

=========================================================================

PUT a food item by ID: **/api/foods/:id**
HTTP Method: **[POST]**

**Body:**
```
| name       | type    | required | description 
| ---------- | ------  | -------- | ---------------------         |
| food_item  | String  | Yes      |  Must be less than 100 chars  |
| events_id  | integer | Yes      |  Must be less than 100 chars  |
| completed  | boolean | Yes      |  Must be 0(false) or 1(true)  | 
```
 
**Example:**
```
[
    {
        "id": 2,
        "food_item": "Potato Salad",
        "events_id": 2,
        "completed": 0
    }
]
```

**Response:** (200) - Food item updated successfully

=========================================================================

DELETE a food item by ID: **/api/foods/:id**
HTTP Method: **[DEL]**

**Body:**
```
| name       | type    | required | description 
| ---------- | ------  | -------- | ---------------------         |
| food_item  | String  | Yes      |  Must be less than 100 chars  |
| events_id  | integer | Yes      |  Must be less than 100 chars  |
| completed  | boolean | Yes      |  Must be 0(false) or 1(true)  | 
```
 
**Example:**
```
[
    {
        "id": 2,
        "food_item": "Potato Salad",
        "events_id": 2,
        "completed": 0
    }
]
```

**Response:** 200 - Food item deleted successfully

=========================================================================

GET a food with events:  **/api/foods/:id/events**
HTTP Method: **[GET]**

**Body:**
```
| name       | type    | required | description 
| ---------- | ------  | -------- | ------------------------------------ |
| event_name | String  | No       | Must be unique/ Must be less than 200 chars |
| time       | String  | No       | Must be unique/ Must be less than 200 chars |
| address    | String  | No       | Must be unique/ Must be less than 200 chars |
| dates      | String  | No       | Must be unique/ Must be less than 200 chars |
| guests     | String  | No       | Must be unique/ Must be less than 200 chars |
| users_id   | Integer | NO       | Must be unique/ Must be less than 200 chars |
```

```
| name       | type    | required | description 
| ---------- | ------  | -------- | ---------------------         |
| food_item  | String  | Yes      |  Must be less than 100 chars  |
| events_id  | integer | Yes      |  Must be less than 100 chars  |
| completed  | boolean | Yes      |  Must be 0(false) or 1(true)  | 
```
 
**Example:**
```
{
    "id": 1,
    "event_name": "Fairmount Park Meet Up",
    "time": "10:00am",
    "address": "Fairmount Park, Philadelphia",
    "dates": "11-20-20",
    "guests": "TJ, Alden, Jake, Cory",
    "users_id": 2,
    "food": [
        {
            "id": 3,
            "food_item": "Burger",
            "events_id": 1,
            "completed": 1
        }
    ]
}
```

**Response:** 200 - View given

=========================================================================

