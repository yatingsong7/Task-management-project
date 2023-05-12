# Task Management Project

A simple web-based task management project built with **React**, **Node**, **Typescript** and **MySQL**.
This repository contains backend in main and the React front-end in [Front-end](https://github.com/yatingsong7/Task-management-project/tree/main/Front-end) folder.

![](/Front-end/.github/Screenshot.png)

## Features

The following features have been implemented:

- Create tasks through Create a Task form(set task titles, descriptions, due dates, priorities and status). Default priority would be "LOW" and default status would be "TO DO"
- View all your tasks in the list of cards format
- View counts of to-do, in-progress, completed tasks on top of tasks
- Mark a to-do or in-progress task as completed
- Mark a to-do or completed task as in-progress
- Delete a task
- See a task status by border color of the task card (to-do: red, in-progree: yellow, completed: green). The colors match with the ones used in task count area
- Filter tasks based on due dates, status and priority
- Error message for task created without title and due date
- Successful created message showing 3 seconds when tasks being successfully created
- Responsive for small screens

## Installation

- Install Node and MySQL
- Install yarn via npm global

- Clone the repo:

```
$ git clone https://github.com/yatingsong7/Task-management-project.git
```

- Go to the project directory and install dependencies for backend:

```
$ cd Task-management-project && yarn install
```

- Go to the Front-end folder and install dependencies:

```
$ cd Front-end && npm install
```

- Run MySQL server on your device
  Install MySQL server and follow the steps to start it  
  https://www.tutorialspoint.com/starting-and-stopping-mysql-server

**To start backend server, in the project directory:**

```
$ npm run dev
```

The api should be running in 3200 port and the database should be in 3307 port.

**To Start web application, go to the Front-end folder and run:**

```
$ npm start
```

It will automatically open the browser, or if not, go to localhost:3200 in your browser

## Project Structure

![](/Front-end/.github/Diagram.png)

## Key Packages

**Backend**

```
typeorm
express
express-validator
mysql2
ts-node
@types/express
@types/node
```

**Front-end**

```
material-UI
@mui/icons-material
@tanstack/react-query
@types/react
date-fns
prop-types
```

## Upcoming Features

- User login and logout
- Order tasks based on due dates, status and priority
- Set checklists of a task
- Set prerequisite tasks of a task
- Select up to 5 tasks and see their progresses
- Set priority for checklists
