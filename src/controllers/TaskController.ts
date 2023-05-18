import { Request, Response } from "express";
import { validationResult } from "express-validator/src/validation-result";
import { In } from "typeorm";
import { AppDataSource } from "../../index";
import Task from "../entities/Task";

class TaskController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      let allTasks = await AppDataSource.getRepository(Task).find({
        order: {
          date: "desc",
        },
      });
      return res.status(200).send(allTasks);
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  public async getOne(req: Request, res: Response): Promise<Response> {
    try {
      let task = await AppDataSource.getRepository(Task).findOne({
        where: { id: Number(req.params.id) },
        relations: ["notes", "todos"],
        order: {
          date: "desc",
          notes: { date: "desc" },
          todos: { checked: "asc", position: "ASC" },
        },
      });
      const results = await AppDataSource.getRepository(Task)
        .createQueryBuilder("task")
        .select()
        .leftJoinAndSelect("task.preTasks", "mainTasks")
        .andWhere("task.id=:mainTaskId", { mainTaskId: Number(req.params.id) })
        .getOne();
      const preTasksIds: number[] = results ? (results.preTasks ? results.preTasks.map((r) => r.id) : []) : [];

      let preTasks = await AppDataSource.getRepository(Task).find({
        where: { id: In(preTasksIds) },
        relations: ["todos"],
        order: {
          date: "desc",
          todos: { checked: "asc", position: "ASC" },
        },
      });
      if (task) task.preTasks = preTasks;
      return res.status(200).send(task);
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

  public async createRelatedTask(req: Request, res: Response): Promise<Response> {
    try {
      await AppDataSource.getRepository(Task)
        .createQueryBuilder()
        .insert()
        .into("related_task_assign")
        .values({ preTaskId: req.body.id, mainTaskId: Number(req.params.id) })
        .execute();

      return res.status(200).send({ success: true });
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

    const data = await taskRepo.findOne({ where: { id: Number(req.params.id) } });

    if (!data) {
      return res.status(400).send("Not find the task");
    }
    req.body = { ...data, ...req.body };

    try {
      const result = await taskRepo.update(Number(req.params.id), req.body);
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
      return res.status(200).send({ success: true });
    } catch (e) {
      return res.status(500).send(e);
    }
  }
}

export const taskController = new TaskController();
