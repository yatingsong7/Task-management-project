import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import { DataSource } from "typeorm";
import Note from "./src/entities/Note";
import Task from "./src/entities/Task";
import { Todo } from "./src/entities/Todo";
import { NoteRouter } from "./src/routes/NoteRoute";
import { TaskRouter } from "./src/routes/TaskRoute";
import { TodoRouter } from "./src/routes/TodoRoute";

//Instantiate express app
const app: Express = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Get environment variables
dotenv.config();

// Create Database Connection
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3307,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  synchronize: true, //Since it's a small project, it's ok to set it to true
  entities: [Task, Todo, Note],
});

// define server port
const port = process.env.PORT;

const routes = TaskRouter(express);
const noteRoutes = NoteRouter(express);
const todoRoutes = TodoRouter(express);
app.use("/", routes);
app.use("/", noteRoutes);
app.use("/", todoRoutes);

// Once DB is connected, start listening to the requests on the default port
AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log("Server is on Port 3200");
    });
  })
  .catch((err) => {
    console.error("Error of initialization: ", err);
  });
