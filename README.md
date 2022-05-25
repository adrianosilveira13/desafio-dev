[![Build Status](https://app.travis-ci.com/adrianosilveira13/desafio-dev.svg?branch=main)](https://app.travis-ci.com/adrianosilveira13/desafio-dev)


# Desafio API

This API was created to showcase my skills as a software developer. The API consist of 5 simple routes:
### - POST Login
Here the user can log in to his or her account
### - POST SignUp
Here the user can sign up to his or her account
### - POST Persist
Here the user can upload a CNAB.txt file that will be persisted on the database
### - GET Stores
Here users can get a relation of stores previously loaded through the Persist route
### - GET Transactions
Here users can get all the transactions related to one store and the final balance (total)


# About the code
This API was created in a couple of days, but it was designed with the best codding pratices in mind. Here my goal was to implement the Clean Architecture as it is describe on Uncle Bob book, by doing this I could easily add or remove more functionality as I wish without too much concern about breaking up the code. All the code is covered with Unit Test with 100% coverage, and it was implemented using TDD methodology.

# Install - PROD
Before running the commans below, ensure that you have configured the env variables correctly:
```
JsonWebTokenSecret: JWT_SECRET
Postegres URL: PGHOST
Postegres User: PGUSER
Postegres Password: PGPASS
Postegres Database: PGDBNAME
```

Build the project and run intial migrations
```
npm run build
```
Starts the server
```
npm start
```

# Usage - DEV
Initialize a Docker Compose
```
npm run up
```

# Technologies used
- NodeJs
- Express
- TypeScript
- Postegres
- TypeORM
- Multer
- Jest
- Faker
- Validator
- Husky
- CORS
- Swagger

# Code principles
- TDD
- SOLID
- Clean Architecture

# Docs
1. [SignUp](./docs/signup.md)
2. [Login](./docs/login.md)
3. [Stores](./docs/stores.md)
4. [Transactions](./docs/transactions.md)
