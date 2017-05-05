This demonstrate how to get user info from Google by using googleapis lib

## Prerequisites
- Google+ API
- Google People API Enabled

## Install
npm i

## run
[PORT=DESIRED_PORT] npm start

## Logging
This project uses bunyan for logging, for better view, you might want to run the followings:
> npm i bunyan -g

> [PORT=DESIRED_PORT] npm start | bunyan

## Note

1. build a protected page
1. create a URL for login
1. create a callback URL for OAuth2
1. retrieve user info AND store the user info in the callback handling
1. use jsonwebtoken#sign to issue JWT
1. use passport to authenticate protected URL(s) with jwt strategy
