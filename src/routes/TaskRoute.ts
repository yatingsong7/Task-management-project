import { Request, Response } from "express";
import { taskController } from "../controllers/TaskController";
import { createValidator, updateValidator } from "../validators/TaskValidators";

export const TaskRouter = (express: any) => {
  var tRouter = express.Router();

  tRouter.get("/", (req: Request, res: Response) => {
    res.send("Server starts on 3200 and DB starts on 3307");
  });

  tRouter.get("/tasks/:id", taskController.getOne);

  tRouter.get("/tasks", taskController.getAll);

  tRouter.post("/tasks", createValidator, taskController.create);

  tRouter.post("/tasks/:id/related", taskController.createRelatedTask);

  tRouter.put("/tasks/:id", updateValidator, taskController.update);

  tRouter.delete("/tasks", taskController.remove);

  return tRouter;
};
