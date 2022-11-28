# tickets-api
To make an api to see tickets,locations and actors to see if there are any movies that you like playing near you and maybe if you like a certain actor/actress you can filter by them to see in which movies they are in and see if you would be interested in seeing that movie.

Made by Marko Eduard Tagoma and Henry Lehis

To clone and start the project

git clone https://github.com/Markoets/tickets-api

cd tickets-api

npm i

npm start

After that go to localhost:8088 to see all the tickets and localhost:8088/docs to see the tickets api documentation.

Instruction for not logged in user:

Go to localhost:8088 to browse different movies

Go to localhost:8088/ticket or click the movies button on the header to show all the movies. Click on the name of the movie to show more details about it.

Go to localhost:8088/location or click the locations button on the header to show all the locations. Click on the name of the location to show more details about it.

Go to localhost:8088/actor or click the actors button on the header to show all the actors. Click on the name of the actor to show more details about it.

Instruction for logged in user:

Go to localhost:8088/admin or click the admin button on the header to render the admin page

Click on tickets to add more tickets

Click on locations to add more locations

Click on actors to add more actors

Instructions for logged in admin:

Click on Delete tickets to delete tickets or to update them

Click on Delete actors to delete actors or to update them

Click on Delete locations to delete locations or to update them

Click users info to update users email/role/password

Instruction for administrator:

To deploy the project remove all the console logs, add .env to .gitignore and disable or update the seeding to remove the seeding remove comment in index.js at line 84 and 131
