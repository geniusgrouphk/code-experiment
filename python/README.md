# tornado-rest-service

## Architecture

Config: to separate different environment configurations as well as credentials, e.g. development, staging, and production

Handler: convert incoming requests to application model and perform flow control

Service: business/application logic layer

Repository: a layer to handler data conversion logic between the application and data source

Models: a bunch of data model classes to carry data and being used within the application

Scheduled: scheduled tasks to be performed periodically

Schemas: JSON Schemas for validation

## start the server

1. `pipenv install`
1. clone the file src/config/credentials/example.json
1. add your mongodb connection string to the JSON file
1. rename the JSON file to `dev.json`
1. `pipenv run python3 src/app.py [--debug=] [--env=] [--port=]`

*default settings: debug=True, env=dev, port=3000

## run tests

1. `pipenv run pytest`

## REST Service

GET /books
GET /books/:id
POST /books
PATCH /books/:id
DELETE /books/:id

## WebSocket

- you can access `http://localhost:3000/message-board`, new messages will be broadcasted via websocket and prepended to the message board periodically
