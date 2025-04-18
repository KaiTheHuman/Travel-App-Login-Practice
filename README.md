# Full-Stack-Music-Application
Class assignment to practice React, Node, Axios, and PhpMyAdmin

# Installation
To install this application, you will need to complete some additional steps.
- 1 Go to backend (cd backend) and input 'npm i' to install node_modules.
- 2 while in frontend, go to db.js and insert your username, database password, database host, and database name into the commented areas.
- 3 Go to backend (cd frontend) and input 'npm i' to install node_modules.
- 4 Set up a MySQL database with user, JourneyPlan, TravelLogs tables, with the mentioned columns in the SQL section of the assignment brief.
- 5 To set up the Hash function type npm i bcrypt in the terminal
- 6 to start server, go to backend/dist (cd backend/dist), node server.js.
- 7 to start React go to frontend (cd/frontend), run start, and if it prompts you to choose a different port number, press Y.


the following are the specifications:
# Assignment 5: Full-Stack Travel Blog Application

## Introduction

This assignment looks at developing a full-stack application utilizing React, MySQL, Express, Node.JS, and Axios to create a full-stack travel log website. Users of this website can log in and make posts (travel logs) about recent trips that they have been on, and also make posts for where they plan to go in the future (journey plans).

## Objective

- Develop a full-stack application capable of storing travel information.
- Utilize Axios and React to perform CRUD activities with your Express server and MySQL database.

## Task Description

### Task 1: React [Frontend Technology] (20%)

- **Boilerplate (5%):** Create a standard React application with a folder for each page (Login, Travel Logs, Journey Plans). The website should use React-Router to navigate between pages.
- **Login (5%):** The Login Page should have the inputs for username and password for a user to login to the website. Once logged in succesfully, this page should display user information from the user model.
- **Travel Logs (5%)**: This page should display a list of all travel logs and provide CRUD functionality for each.
- **Journey Plans (5%)**: This page should display a list of all journey plans and provide CRUD functionality for each.

### Task 2: Express/Node.js [Backend Technology] (40%)

- **Boilerplate (5%):** Set up a Node.js project with an Express server connecting to your database.
- **Controllers (10%):** Implement all CRUD functionality for users, travel logs and journey plans in their own separate controllers.
- **Routes (5%):** Create routes for each controller in their own file to direct all requests based on URLs.
- **Authentication (20%):** Implement functionality to hash the password when the user registers with bcrypt, and when logging in they must match with the hashed credentials to view the logs and plans. Users should only be able to see plans and logs in their account.

### Task 3: SQL (MySQL) [Database Technology] (20%)

- **User Model (10%):** Define a user model with fields for username [STRING], password [STRING with minimum length of 8], email [STRING with validation as email], address [STRING], travel logs [ARRAY of IDs] and journey plans[ARRAY of IDs]. You must validate and use the correct data types.
- **Travel Log Model (5%):** Define a travel log model with fields for title [STRING], description [STRING], start date [DATE], end date [DATE], post date [DATE] and tags [ARRAY of Strings]. You must use the correct data types. You must validate and use the correct data types.
- **Journey Plan Model (5%):** Define a journey plan model with fields for journey plan name [STRING], journey plan locations [ARRAY of Strings], start date [DATE], end date [DATE], list of activities [ARRAY of Strings] and a description [STRING]. You must validate and use the correct data types.

### Task 4: Demonstrator Explanation (20%)

Students will be asked two questions regarding the assignment and key concepts used in the project. Each question is worth 10% of the assignment.

## Deliverables

Submit a .ZIP file to Moodle containing the following items:

- frontend
- backend
- screenshot.jpg (Screenshot of the home page)

Exclude the `node_modules` folder from both.

## Extra Notes
