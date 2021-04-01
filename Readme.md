# Chinook SSR

This repository is my implementation of Node.js + React.js _Server-Side-Rendering_ or SSR*.
The goal for building this application was to display "Tracks" from the [Chinook Dataset](https://github.com/lerocha/chinook-database) in a tabular form and also give the user an endpoint to create new tracks.

## Caveats

This isn't truly a server side rendered application. The application serves _React_-ive webpages with configurable static content for each page, allowing me to improve the SEO score and improving first load times.

## Running it locally

The application uses [Postgres](https://www.postgresql.org/download/) as the primary database and [Node.js](https://github.com/nvm-sh/nvm). To run the application locally, download Postgres and follow the steps below

### Create the DB
```
$ createdb -h localhost -p 5432 -U <pg_user> chinook
```

### Navigate to the application directory
```
$ cd ./path/to/application/dir
```


### Seed the DB
```
$ psql -h localhost -d chinook -U <pg_user> -p 5432 -f seed.sql
```

> Note: The seed file used in this application is different from the default chinook seed file you can find on the original repository. Since the primary keys are note serial and do not auto-increment, I've added commands to create a `Sequence` and alter the "TrackID" column for the table used.

### Create the Environment variables file
The command below are for MacOS, alter them for your machines OS. Replace the `pg_user` with the one you used above to crate the db
```
$ touch .env
$ __env="BASE_URL="http://localhost:3000"
BASE_PORT=3000
PGUSER=pg_user
PGHOST=localhost
PGDATABASE=chinook
PGPORT=5432"
$ echo "$__env" > .env
```

### Run the application
```
$ npm i
$ npm run dev
```

## To-Do

1. Add a Dockerfile and scripts to ease deployments
