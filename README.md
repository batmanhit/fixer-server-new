# FIXER Test Backend

Apollo Server with Express.

## Installation

* Move to the source folder
* `touch .env`
* `npm install`
* fill out *.env file* (see below)
* start PostgreSQL database
* `npm start`
* visit `http://localhost:8000` for GraphQL playground

#### .env file

Since this project is using PostgreSQL, you have to install it for your machine and get a database up and running. After you have created a database and a database user, you can fill out the environment variables in the *.env* file.

```
DATABASE=mydatabase

DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
```

#### Testing

* Testing has not been added fully yet
