# Serato Now-Playing On Twitter

This is a Node script that will automatically Tweet out your currently playing track in Serato DJ Pro.

<hr>

You will need to sign up for and add a Twitter dev account (<a href="https://developer.twitter.com/en">dev.twitter.com</a>) to the Twitter account you want the script to tweet out to.  

You will also need the "live playlists" and "Serato playlists" boxes checked in the extensions tab of your Serato settings.  Once enabled, you can stream the live tracks that you're playing to your Serato profile.  In the Serato main view, click the "history" button and you'll see the option to begin a new playlist session.  

IMPORTANT: Once connected, this will open a new browser window.  Don't close it!  You'll need to make sure that your that your playlist stream is public (it's private by default).  Click/tap the "edit settings" option to the right, set it to "public", and save/update.

<hr>

Once you begin playing tracks, you should see them begin to populate the Serato live playlist page.  The most recent track appears at the bottom of the list.

This app is effectively scraping the track data from the most recent entry which is then passed as the body for each new Tweet.  The global "currentTrack" is used to track this value; if different, it's updated and the new data is returned (otherwise, an empty return if "currentTrack" hasn't changed).  It's set to run on a 30 second interval by default but that can be adjusted as needed.

<hr>

Twitter credentials are stored locally via dotenv.  Create the necessary .env file and save it with the tokens generated when creating a new app in your Twitter dev profile.

The Procfile is included for easy Heroku deployment.