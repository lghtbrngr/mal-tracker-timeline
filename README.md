# MyAnimeList Tracker Timeline
A simple web app that provides an alternative way for users of myanimelist.net (MAL) to view and
update their anime lists, especially their Currently Watching list.
The main idea is to display the Currently Watching list visually as a timeline, with more-recently-viewed
titles toward one side and less-recently-viewed titles toward the other.
Includes a backend server that integrates with the official MAL API to access user anime lists.

# Getting Started
1. create .env file from .env.example. Fill out MAL_USERNAME, MAL_CLIENT_ID, and MAL_CLIENT_SECRET.
1. `npm install`
1. `npm start` - starts two processes
1. visit the web app at localhost:3000

# Docker setup
1. Install docker desktop
  - Easiest way to run multi-platform docker builds, which are necessary for deployment on ARM-based servers. But if you're just running the app locally, no need to build for multiple platforms.
1. Authenticate to docker hub within docker desktop, if pushing image to docker hub
1. Deployment is currently manual. You build the docker image locally, push it to docker hub, then pull it down
from the production environment. Follow the below steps to connect your docker account to your local docker cli in your production environment.
  1. create repository on hub.docker.com
  1. create access token (see https://docs.docker.com/security/for-developers/access-tokens/#create-an-access-token)
  1. `docker login --username YOUR_USERNAME` and use the access token as the password
  1. You'll also need to create an access token for your production environment if it's separate

# Other development notes
- in development, backend server runs at localhost:3001, and frontend server forwards requests to it
- in production, only the backend server runs, and it serves the frontend as well. It's deployed as a docker container.
- `npm client` starts just the dev server for the web app
- `npm server` starts just the backend server
- `npm run build` runs the CRA build script and then builds the production docker image
- `npm run docker` runs a docker container based on the built image.
  - The web app running in the docker container should still be accessible at localhost:3000.
  - You need docker set up (docker daemon running) and your user added to the docker group in order for this to work.
- `npm run dockerpush` pushes the image to docker hub.
  - You need docker credentials set up for this to work.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
