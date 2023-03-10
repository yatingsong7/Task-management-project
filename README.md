# Task Management Project

A simple web-based task management project built with **React**, **Node**, **Typescript** and **MySQL**.
This repository contains backend in main and the React front-end in [Front-end](https://github.com/yatingsong7/Task-management-project/tree/main/Front-end) folder.

![](/Front-end/.github/Screenshot.png)

## Features

- The following features have been implemented:
- Create tasks through Create a Task form(set task titles, descriptions, due dates, priorities and status). Default priority would be low and default status would be "TO DO"
- View all your tasks in the list of cards format
- View counts of to-do, in-progress, completed tasks on top of tasks
- Mark a to-do or in-progress task as completed
- Mark a to-do or completed task as in-progress
- See a task status by border color of the task card (to-do: red, in-progree: yellow, completed: green). The colors match with the ones used in task count area
- Error message for task created without title and due date
- Successful created message showing 3 seconds when tasks being successfully created
- Responsive for small screens

## Installation

## Project Structure

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
