import { noteController } from "../controllers/NoteController";
import { createValidator, updateValidator } from "../validators/NoteValidators";

export const NoteRouter = (express: any) => {
  var nRouter = express.Router();

  nRouter.get("/tasks/:taskId/notes", noteController.getAll);

  nRouter.post("/tasks/:taskId/notes", createValidator, noteController.create);

  nRouter.put("/tasks/:taskId/notes/:noteId", updateValidator, noteController.update);

  nRouter.delete("/tasks/:taskId/notes/:noteId", noteController.remove);

  return nRouter;
};
