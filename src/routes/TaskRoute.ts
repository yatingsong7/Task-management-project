import { Request, Response } from "express";
import { taskController } from "../controllers/TaskController";
import { createValidator, updateValidator } from "../validators/TaskValidators";

export const TaskRouter = (express: any) => {
  var tRouter = express.Router();

  tRouter.get("/", (req: Request, res: Response) => {
    res.send("Server starts on 3200 and DB starts on 3307");
  });

  tRouter.get("/tasks", taskController.getAll);

  tRouter.post("/tasks", createValidator, taskController.create);

  tRouter.put("/tasks", updateValidator, taskController.update);

  tRouter.delete("/tasks", taskController.remove);

  return tRouter;
};
