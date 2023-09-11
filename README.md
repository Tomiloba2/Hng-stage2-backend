# HNG STAGE TWO TASK
This project is a simple REST API capable of performing CRUD operations on a "person" resource.  
This Api interfaces with the Postgressql database resource

## Project Setup
In order to setup and host this project locally, follow the following steps  
1. clone this repository using the **git clone** command
2. Navigate to the root directory of Your project an in the terminal run **npm install** to install the required packages
3. Next, run **npm run dev** to start up the local server on *localhost:2000*

## How to query data to and from the API
This Api was developed with endpoints for

* CREATE:Adding a new person =>[ **http:localhost:2000/api**]( http:localhost:2000/api) .The user name is provided in the request body eg **{name:username}**
response format **{id:userId,name:'username'}**

* READ:Fetching details of a person =>.The user id or user name  should be passed as a dynamic parameter in the url in order to get a particular user details
url format [**http:localhost:2000/api/user_id**](http:localhost:2000/api/user_id) or [**http:localhost:2000/api/username**](http:localhost:2000/api/username) 
response format **{id:userId,name:username}**

* UPDATE:Modifying Details of an existing person=>
url format [**http:localhost:2000/api/user_id**](http:localhost:2000/api/user_id)  or [**http:localhost:2000/api/username**](http:localhost:2000/api/user_id) 
request format in json **{name:username}**
response format **updated successfully**

* DELETE: REmoving a person=>deleting a user does not require data to be passed into the request body
url format **http:localhost:2000/api/user_id**  or **http:localhost:2000/api/username** 

## Link to UML diagrams
[get a visual represntation of the entire REST API Project](https://helloworld)