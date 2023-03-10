import { AppDataSource } from "../../index";
import { Task } from "../entities/Task";
import { Request, Response } from "express";
import { validationResult } from "express-validator/src/validation-result";

class TaskController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      let allTasks = await AppDataSource.getRepository(Task).find({
        order: {
          date: "ASC",
        },
      });
      return res.status(200).send(allTasks);
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    try {
      const data = AppDataSource.getRepository(Task).create({ ...(req.body as Task) });
      const result = await AppDataSource.getRepository(Task).save(data);
      return res.status(200).send(result);
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    const taskRepo = AppDataSource.getRepository(Task);

    const data = await taskRepo.findOne({ where: { id: req.body.id } });

    if (!data) {
      return res.status(400).send("Not find the task");
    }

    try {
      const result = await taskRepo.update(req.body.id, { status: req.body.status });
      return res.status(200).send(result);
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  public async remove(req: Request, res: Response): Promise<Response> {
    const taskRepo = AppDataSource.getRepository(Task);
    const data = await taskRepo.findOne({ where: { id: req.body.id } });

    if (!data) {
      return res.status(400).send("Not find the task");
    }

    try {
      await taskRepo.delete(req.body.id);
      return res.status(200).send();
    } catch (e) {
      return res.status(500).send(e);
    }
  }
}

export const taskController = new TaskController();
