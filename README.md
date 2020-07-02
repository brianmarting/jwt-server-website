# jwt-server-website

This project contains two folders:

- server: Contains the express server that will communicate with the react app
- website: Contains the react app website that communicates with the express app

## Server

Normal express server with JWT authentication via cookies. <br/>
It is secured with an access token and with a refresh token, a good explanation on how these work is [here](https://stackoverflow.com/questions/3487991/why-does-oauth-v2-have-both-access-and-refresh-tokens#:~:text=The%20difference%20between%20a%20refresh,mean%20the%20user's%20logged%20in.). 

A docker-compose.yaml file is also present that fetches a psql image and runs it, so you do not have to install psql locally.

The config for connecting with the psql image is located in the `ornconfig.json` file, adjust the config where needed.


