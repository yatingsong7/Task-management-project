# Task Management Project

A web-based task management project built with **React**, **Node**, **Typescript**, **MySQL** and **Material UI**.
This repository contains backend in main and the React front-end in [Front-end](https://github.com/yatingsong7/Task-management-project/tree/main/Front-end) folder.

## Highlights

- This project allows you to break down a big job into small tasks but view them all when you want. Unlike other project management tools that you can only view one task at one time, this project allows you to link related tasks and view them together in one page so you understand the whole progress of a big job.
- This project combines project management with to-do lists. You can set up a to-do list to a task. You can select this task and select "include related tasks' to-do list". Then it will generate a to-do list for you including all you need to do for finishing a big job.

**Main board**
![](/Front-end/.github/main.png)
**Filter tasks**
![](/Front-end/.github/filter.png)
**Create a task**
![](/Front-end/.github/create.png)
**Edit a task**
![](/Front-end/.github/edit.png)
**View a task with related tasks**
![](/Front-end/.github/view.png)
**Generate a to-do list**
![](/Front-end/.github/to-do.png)

## Features

The following features have been implemented:

### Tasks

- View all your tasks in the list of cards format
- View counts of to-do, in-progress, completed tasks on top of tasks
- Filter tasks based on due dates, status and priority
- Responsive for small screens

### Manage a task

- Create tasks through Create a Task form(set task titles, descriptions, due dates, priorities and status). Default priority would be "LOW" and default status would be "TO DO"
- Mark a task as to-do, in-progress and completed
- Edit a task's title, due date, description
- Delete a task
- Add notes to a task; Delete a note; See timestamp for a note
- Set up a to-do list to a task; Set up orders from 1 to 10 of the to-do items; Check and uncheck a to do item
- Set up related tasks of a task (this allows you to link related tasks. For example, task A is doing an API for login and task B is doing the UI for login box. They are related to each other so you can link them.)
- View details of a task and details of its related tasks, to see their to-do lists and progress in one panel
- Select one task and generate today's to-do for you; Allows to include to-do of its related tasks

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
- Select up to 5 tasks and generate today's to-do list
