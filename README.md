[![Build Status](https://travis-ci.org/shroomist/kex-access-control.svg?branch=master)](https://travis-ci.org/shroomist/kex-access-control)

# Resource Access Control

## Installation
```bash
npm i
source ./env # or export KEX_DB_URL="your://postgre:url"
npm run build
$(npm bin)/sequelize db:create --url=$KEX_DB_URL
$(npm bin)/sequelize db:migrate --url=$KEX_DB_URL
$(npm bin)/sequelize db:seed:all --url=$KEX_DB_URL
```

## Running tests
```bash
npm test
```

## Running
```bash 
npm start
curl -H "user: admin" localhost:3000/resources/moder_resource
# responds with "moder data"
curl -H "user: admin" -X POST localhost:3000/users/arthur
# responds with "Created"
curl -H "user: arthur" -H "Content-Type: application/json" -X POST -d '{"text": "interesting part"}' localhost:3000/resources/treasure
# responds with "Created"
curl -H "user: arthur" localhost:3000/resources/treasure
# responds with "interesting part"

curl -H "user: moder" localhost:3000/resources/moder_resource
# responds with "moder data"
curl -H "user: admin" localhost:3000/resources/moder_resource
# responds with "moder data"
curl -H "user: arthur" localhost:3000/resources/moder_resource
# responds with "Not Found"

```