# MyAnimeList Tracker Timeline
A simple web app that provides an alternative way for users of myanimelist.net (MAL) to view and
update their anime lists, especially their Currently Watching list.
The main idea is to display the Currently Watching list visually as a timeline, with more-recently-viewed
titles toward one side and less-recently-viewed titles toward the other.
Includes a backend server that integrates with the official MAL API to access user anime lists.

# Getting Started
1. create .env file from .env.example, filling out the missing fields
1. `npm install`
1. `npm start` - starts two processes
1. visit the web app at localhost:3000

# Other development notes
- in development, backend server runs at localhost:3001, and frontend server forwards requests to it
- in production, only the backend server will run, and it will serve the frontend as well
- `npm client` starts just the dev server for the web app
- `npm server` starts just the backend server


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
