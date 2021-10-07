# Open-Source Customer-Service-Discord-Bot
 
This application is a Prototype for a Customer-Service-System. It is an extension (or BOT) for 
the communication app **DISCORD**. The application is easy to install and helps with the support of customers.

The Bot allows you to use Discord as a replacement of E-Mail and Telephone by using the following features:

1. Manage your Support Employees
2. Control the entry of customers to your Discord-Server
3. Save important customer information
4. Completely automate the process of support

This application is the result of a bachelor thesis.

##How to set up the Application

###The Discord System

To use the application all the employees using it need a **Discord-Account**.
To create it go to **https://discord.com/**.
You can either use the desktop client or the browser app.

As the application is written **JavaScript** and **Node.js** the person setting it up should be capable of somewhat 
understanding the language and able to start a **Node**-App. 

###The Developer Portal

The first step of setting the bot up is to create an application on the **Discord Developer Portal**.
**https://discord.com/developers/docs/intro**

If necessary you can make yourself familiar with the system by reading the documentation.

To set up an application got to: 
> Applications ---> New Application ---> Chose a name and click 'Create'

If required you can choose a description and change the settings.

The next step is to create a bot. Go to:
>Bot ---> 'Add Bot'

Give the Bot a name. The name will be displayed whenever it interacts with users.

Save the **TOKEN** of the bot and keep it a secret as it is the key to controlling the application.

Scroll down and activate the two sliders under **Privileged Gateway Intents**.

Don't close the developer portal. You will need it after the next step. Now you need to create a **Server** in **Discord**.

###Creating a Server

To create a **Server** with the right settings for the application enter the following link in the browser.

**https://discord.new/jVs9BpQGjUtr**

The link opens either the desktop or the browser app and lets you create a new Server with 
a template. This template already contains all the required settings, roles and channels. 

You can now add all the employees profiles to the Server. Add the 'Admin'-Role to every employee by
right-clicking on their profile, clicking on 'Roles' and checking the 'Admin'-Role.

###Adding the Bot to your Server

To add the bot to your server you need to go back to the developer portal. 
On the left side of the page go to 'OAuth2'.

Scroll down to the 'OAuth2 URL Generator'. Put a checkmark in the box 'bot'.
Below the field of boxes a URL will have been generated. Click on 'Copy' and enter the link into your browser.
A message will ask you which server to add the bot to. Choose the Server you just created.

###Seeing IDs

To interact with the Bot in reference to entities in the **Discord**-System like Users, Channels, Roles
etc. you need the ability to see and copy IDs. This is done by activating the **Developer Mode**.
Select the 'gear' next te your profile picture on the bottom right of the **Discord** application and
go to 'Advanced'. Activate the setting 'Developer Mode'. You can now right-click on channels for example and
'Copy ID'.

###Installing Node
To run the local application of the Bot you need to install node on the system.
To do so go to: **https://nodejs.org/en/**. Please download the **Current**-Version and install it.

You can check if **Node** was successfully installed by running the command `node --version` 
on a command line interface. 
(A command line interface is also required to run the program. Depending on the operating system
a native one is already installed)

###Configuring the Application

On this **GitHub**-Page. Go to:
>'Code' (Green Button) --> choose 'Download ZIP'

Unpack the Zip in the location you want the application in.
In the root folder of the application open the `.env`-File

Enter your Bots **Token** like this ``TOKEN=ENTER_YOUR_TOKEN_HERE``

You also need to enter the ID of your Servers 'bot-messages'-Channel. On your
**Discord**-Server right-click on the 'bot-messages'-Channel and 'Copy ID'.
Enter it into the `.env` like so ``BOTCHANNEL=ENTER_THE_ID_HERE``


You also need to add all the people responsible for managing the employees ('Owners') to the `admins.json`. It's located
in `/data/admins.json`.

`"owners": [
{
"user_name": "NAME",
"user_id": "USER_ID"
}
]`

You can get the 'USER_ID' by right-clicking on the User and selecting 'Copy ID'. If you want to
enter multiple users, add them in the same format after the `}` seperated by a `,`. 

###Running the application 

To run the application you need to run it in a Command-Line-Interface.
It needs to be pointed to the root folder of the application.

Use the following command to change the directory:
`cd C:\Users\PATH_TO_THE_APPLICATION\`

Run the application like this
`node index.js`

If you did everything right the console will show `I'm Ready`.

##How to use the Application

Customers can join the Server by using the invite link of your server.
To find it select the little arrow in the top left of your server and select 'Invite people'. 
In the now opening window you can find the invite link. Make it available to all the customers that need access
by showing it on your website for example.

To control the **Bot** you need to enter commands in the chat of the 'bot-messages'-Channel.
All available commands can be seen by entering the command:
`!help`

For new customers to be able to join the server an Admin(Employee in Support) needs to logged in.

First, register all the Admins by entering the following command:
`!register USER_ID USER_NAME`
Copy the USER_ID from the user and choose a USER_NAME for them.

The registered Admin can now set himself to 'logged-in' by entering the command:
`!onlineme`
To log out, the Admin needs to enter:
`!unonlineme`

The Admin has two statuses `READY` and `BUSY`. To change the respective status use:
`!readyme` or `!unreadyme`.

For an Admin to receive a new customer they need to use the command:
`!next`

The Bot will respond to the message with the information about the next customer.
This customer can now be messaged to start the support process. If a text conversation is not sufficient the
Admin and the customer can meet in the **Voice-Channel** that was created for the process.

To note the problem of the customer in the system it can be saved by the Admin by using the command:
`!addProblem CUSTOMER_ID TEXT_WITH_PROBLEM`.

The Admin can also add a note by using:
`!addNote CUSTOMER_ID NOTE`.

To access all the saved information the Admin can use:
`!customer CUSTOMER_ID` to show all the saved information.

When the process of support is finished the user can either leave the server by themselves or the Admin can 
remove them. For that, right-click on the Customer and choose 'kick USER'. DO NOT BAN THEM, if they should be
able to join again with a new problem.

Thanks for using this application. For any questions, suggestions or problems, feel free to contact me 
by E-Mail: **tillman.staedtner@gmail.com** 




