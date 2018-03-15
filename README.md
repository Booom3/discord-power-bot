# discord-power-bot

The Discord bot that's more about the project than the bot itself.  
  
Project Discord server: https://discord.gg/k42x42a

## The very basics

* Clone the repository
* Open a console in the project directory and run the following commands
* `npm install`
* `npm install -g typescript`
* `tsc`

Start the bot by running `node ./distribution/binary/worldwideweb.js`
> You probably want to set the environment variable DEBUG to `bot:*` to log output  
> In Powershell you would do this by `$Env:DEBUG="bot:*"; node ...`

## How to actually make it work

In order to actually run the bot you need to do a few things.

* Create an app and then a bot user for the app by going here https://discordapp.com/developers/applications/me
* Set environment variable DISCORDTOKEN to the token you get from the bot user attached to your discord app

Run the bot after doing that and your bot will be running. Then all you need to do is to invite it to your server,
which you can do by going to `localhost:3000` or whichever port your bot is listening on. It should show
you a link where you put in the client ID of the app you created on the Discord page.  
Paste the finished link into your browser and you should be presented with a screen that lets you add the bot to any server
that you have admin rights on.  
  
## The Database

Included with the project is `dpbdbscript.pgsql`. This file sets up your PostgreSQL database for use with Discord Power Bot. This is necessary to access most of the functionality of the bot.  
* Install PostgreSQL
* Launch the PostgreSQL executable with the following arguments
* `-U postgres -f <path\to\dpbdbscript.pgsql>`
* If you want to use a user other than `postgres`, change it to the user you created
  
This page is a **heavy WIP** and so will get a lot better over time.
