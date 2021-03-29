# Chinook SSR

## Goal

Build a web application that displays data from a relational db and allows the user to insert more records.
Since the data is going to be displayed in a table, without filter/sort options (*will probably add them later), it's better to have a SSR web app that does this.

## Features

1. Webapp: Express.js + React.js SSR
2. There will be no user authentication/authorisation, instead I'll be using application layer rate limiting using Redis
3. No SSL, I don't have a certificate
4. No security, since this is just a POC and I don't intend on hosting this application in perpetuity
5. Will most likely use AWS to test and deploy the MVP
