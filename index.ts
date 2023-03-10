import { Task } from "./src/entities/Task";
import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { TaskRouter } from "./src/routes/TaskRoute";

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
  entities: [Task],
});

// define server port
const port = process.env.PORT;

const routes = TaskRouter(express);
app.use("/", routes);

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
