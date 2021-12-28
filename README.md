# OMM_Project
# Backend Server setup Instructions
First cd into the server folder directory and create a file called index.js
While in the same directory, Install 
  $ npm init -y --> to initialize an empty package.json to be able to install all the necessary dependencies. 

# List of dependencies we need (we can write the installation command all at once for all dependencies)
  $ npm install body-parser --> this will enable us to send POST requests
  $ npm install cors
  $ npm install express --> as a framework to create the routing of our application
  $ npm install mongoose --> to create models for our database
  $ npm install nodemon --> so we don't have to manually reset the server everytime we make a change 
  
# under index.js file, we write the following to import the dependencies we installed:
  $ import express from "express";
  $ import bodyParser from "body-parser";
  $ import mongoose from "mongoose";
  $ import cors from "cors";
  

# Frontend react setup Instructions
First cd into the frontend folder directory
Then we initialize a react app inside there using 
  $ npx create-react-app ./ 
  x
