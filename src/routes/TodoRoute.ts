import { todoController } from "../controllers/TodoController";
import { createValidator, updateValidator } from "../validators/TodoValidators";

export const TodoRouter = (express: any) => {
  var tRouter = express.Router();

  tRouter.get("/tasks/:taskId/todos", todoController.getAll);

  tRouter.post("/tasks/:taskId/todos", createValidator, todoController.create);

  tRouter.put("/tasks/:taskId/todos/:todoId", updateValidator, todoController.update);

  tRouter.delete("/tasks/:taskId/todos/:todoId", todoController.remove);

  return tRouter;
};
