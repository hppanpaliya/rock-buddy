
![alt text](https://raw.githubusercontent.com/frankappolonia/rock-buddy/main/rockbuddyspotify small.png)



How To:

After downloading the zip:

1. In the root directory, run ‘npm i’ to install the node modules for the client (react)

2.cd (change directory) to the /api folder. Run ‘npm i’ to install the node modules for our server (express.js).

3. While you are in the /api folder, place the .env file in the root level of the folder (where the package.json is)

4. Install Graphics Magick CLI (NOT IMAGE MAGICK) on your machine
  a. Follow the install instructions based on your OS here http://www.graphicsmagick.org/README.html

5. Install Redis CLI
  a. https://redis.io/docs/getting-started/
    i. Linux/Mac installs are straightforward. If you are a window user, you need to install the WSL (https://learn.microsoft.com/en-us/windows/wsl/install). OR, if you are on older versions of windows you can install         the Ubuntu terminal app from the windows store and follow these instructions https://learn.microsoft.com/en-us/windows/wsl/install
    ii. Start redis in terminal (‘redis-server’ on windows Ubuntu App or ‘sudo service redis-server start on Linux/Mac’) - if these commands do not work for your           particular installation method, the redis docs provided above will be able to help you identify the exact command needed
    iii. After starting redis, use redis-cli command to confirm it is running

6. Run the command ‘npm start’ while in the /api folder to start the server. The server must be running locally regardless of which option you choose in step 7.

7. Now to view the client, there are two options
   a. Run the client locally
      i. In the root directory of the project, run ‘npm run build’ and build the app
      ii. In the root directory of the project, run the command ‘npm start’ to boot the react app
  b. Access our hosted react app on heroku via https://rock-buddy.herokuapp.com/
    (Notes: You MUST have the API running locally when using the heroku link. Also, if you have the latest version of chrome, disable experimental features. If   experimental features are enabled, you may encounter CORS errors when the hosted client makes API requests to the local server)

8. When you are on the client, functionalities such as searching for songs/albums/tracks, viewing songs/albums/tracks, searching events, and viewing events do not require an account

9. If you register an account and log in, you will have access to the profile page, the direct message feature, and you will also then have the ability to log in with Spotify. Logging out of your account will automatically log you out of Spotify as well. You must be logged in to authenticate with Spotify.

10. When logged in to Spotify, you will gain access to additional features. These features are that you can play songs from the playlists on your profile page, and add songs to your playlists. (Notes: 
  a. You CANNOT add songs to playlists that your account does not own/has not created. In the Spotify account that is given for the TAs to try out, there are some playlists that are not owned by the account. If you try to add songs to them, the app will let you know you are not authorized. We have created a ‘554 test playlist’ for you to use. 
  b. The functionalities described above require a Spotify premium account
  c. In addition, the Spotify premium account must be pre-registered in our Spotify App in the Spotify API dev console in order to work. This is a limitation of the free license. So you cannot just log in with any spotify premium account.
