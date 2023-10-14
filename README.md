# Rock Buddy

![Rock Buddy Logo](https://raw.githubusercontent.com/frankappolonia/rock-buddy/main/rockbuddyspotifysmall.png)

## Table of Contents

- [Rock Buddy](#rock-buddy)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Demo](#demo)
  - [Getting Started](#getting-started)
  - [Frontend](#frontend)
    - [React Components](#react-components)
    - [Redux Store](#redux-store)
    - [Frontend Dependencies](#frontend-dependencies)
  - [Backend](#backend)
    - [Express Routes](#express-routes)
    - [Data Access](#data-access)
    - [Backend Dependencies](#backend-dependencies)

## Overview

Rock Buddy is a comprehensive web application built with React, Redux, Express, and Firebase that allows users to seamlessly search and delve into rock music. Here are the salient features:

- Search and view details for rock artists, albums, and tracks.
- Integrated Spotify for song previews and user authentication.
- Real-time chat functionality.
- Event search via Ticketmaster API.
- Secure user profiles with Firebase.

The frontend leverages the power of React and Redux, while the backend is powered by Node/Express, which interfaces with the Spotify API and Firebase. Performance is amped up with data caching via Redis.

Now, both the backend and frontend are hosted together on Vercel at [https://rock-buddy.vercel.app/](https://rock-buddy.vercel.app/).

## Demo

Watch a live demo of the project in the video below:

[![Watch the demo](http://img.youtube.com/vi/VgJJ44f4KBM/0.jpg)](https://www.youtube.com/watch?v=VgJJ44f4KBM)


## Getting Started

To set up Rock Buddy on your local environment:

After cloning the repo:

1. In the root directory, run ‘npm i’ to install the node modules for the client (react).

2. cd (change directory) to the /api folder. Run ‘npm i’ to install the node modules for our server (express.js).

3. While you are in the /api folder, place the .env file in the root level of the folder (where the package.json is).

4. Install Graphics Magick CLI (NOT IMAGE MAGICK) on your machine
   - Follow the install instructions based on your OS here http://www.graphicsmagick.org/README.html
   
5. Install Redis CLI
   - https://redis.io/docs/getting-started/
   - Start redis in terminal 
   - Confirm it is running with `redis-cli`
   
6. Run the command ‘npm start’ while in the /api folder to start the server. 

7. Now to view the client, there are two options:

   a) Run the client locally
      - In the root directory, run ‘npm run build’ and build the app
      - In the root directory, run the command ‘npm start’ to boot the react app
      
   b) Access the hosted react app on Vercel via [https://rock-buddy.vercel.app/](https://rock-buddy.vercel.app/)
      - You MUST have the API running locally when using this link
      - Disable experimental features in Chrome to avoid CORS errors

8. Core functionality like searching and viewing events/songs/artists does not require an account. 

9. Register an account to access:
   - User profile
   - Direct messaging
   - Spotify integration
   
10. Logged in Spotify features:
    - Play songs from playlists
    - Add songs to your playlists
      - Can only add to playlists you own
      - Requires Spotify premium account
## Frontend

The React-based frontend code resides in the `src` directory.

### React Components

- `App`: Main application hub.
- `Home`: The welcoming page.
- `Navbar`: Navigation bar.
- `Search`: Music search utility.
- `ArtistPage`, `AlbumPage`, `TrackPage`: Detailed views for artists, albums, and tracks respectively.
- `Events`: Upcoming rock events.
- `EventSearch`: Event finder.
- `Profile`: User dashboard.
- `SignIn`: Authentication gateway.
- `Chat`: Live chatroom.

### Redux Store

State management is done using Redux. The main configuration can be found in `src/store/index.js`. Reducers for each state component are present in `src/store/features`.

### Frontend Dependencies

- React
- React Router
- Redux Toolkit
- React Bootstrap
- Material UI
- Firebase
- Axios

## Backend

All Node/Express backend operations are in the `api` directory.

### Express Routes

Routes to different resources are within `api/routes`:

- `home.js`: Home route.
- `search.js`: Music searches.
- `info.js`: Data fetchers for entities.
- `events.js`: Event-related routes.
- `users.js`: User data routes.

### Data Access

Data extraction from external APIs is handled by modules in `api/data`:

- `search.js`: Spotify API searcher.
- `info.js`: Spotify API data fetcher.
- `events.js`: Ticketmaster API interface.

Cached data is stored in Redis to ensure faster access.

### Backend Dependencies

- Express
- Nodemon
- Dotenv
- Axios
- Redis
- Spotify API
- Ticketmaster API
- GraphicsMagick (GM)

---

For additional details or queries regarding the application, please refer to the official documentation or get in touch with the development team.

