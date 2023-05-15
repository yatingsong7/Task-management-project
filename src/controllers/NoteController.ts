import { AppDataSource } from "../../index";
import Note from "../entities/Note";
import { Request, Response } from "express";
import { validationResult } from "express-validator/src/validation-result";

class NoteController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      let allNotes = await AppDataSource.getRepository(Note).find({
        order: {
          date: "ASC",
        },
      });
      return res.status(200).send(allNotes);
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  public async create(req: Request, res: Response) {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }
    try {
      req.body = { ...req.body, taskId: req.params.taskId };
      const data = AppDataSource.getRepository(Note).create({ ...(req.body as Note) });
      const result = await AppDataSource.getRepository(Note).save(data);
      return res.status(200).send(result);
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  public async update(req: Request, res: Response) {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    const noteRepo = AppDataSource.getRepository(Note);
    const data = await noteRepo.findOne({ where: { taskId: Number(req.params.taskId), id: Number(req.params.noteId) } });

    if (!data) {
      return res.status(400).send("Not find the task");
    }
    req.body = { ...data, ...req.body };
    try {
      const result = await noteRepo.update(Number(req.params.noteId), req.body);
      return res.status(200).send(result);
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  public async remove(req: Request, res: Response) {
    const noteRepo = AppDataSource.getRepository(Note);
    const data = await noteRepo.findOne({ where: { taskId: Number(req.params.taskId), id: Number(req.params.noteId) } });
    if (!data) {
      return res.status(400).send("Not find the task");
    }
    try {
      await noteRepo.delete(Number(req.params.noteId));
      return res.status(200).send({ success: true });
    } catch (e) {
      return res.status(500).send(e);
    }
  }
}

export const noteController = new NoteController();
