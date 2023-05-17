import { Request, Response } from "express";
import { validationResult } from "express-validator/src/validation-result";
import { AppDataSource } from "../../index";
import { Todo } from "./../entities/Todo";

class TodoController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      let allTodos = await AppDataSource.getRepository(Todo).find({
        order: {
          checked: "ASC",
          position: "ASC",
        },
      });
      return res.status(200).send(allTodos);
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
      req.body = { ...req.body, taskId: req.params.taskId, checked: 0 };
      const data = AppDataSource.getRepository(Todo).create({ ...(req.body as Todo) });
      const result = await AppDataSource.getRepository(Todo).save(data);
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

    const todoRepo = AppDataSource.getRepository(Todo);
    const data = await todoRepo.findOne({
      where: { taskId: Number(req.params.taskId), id: Number(req.params.todoId) },
    });
    console.log(req.params.todoId);
    if (!data) {
      return res.status(400).send("Not finding the todo");
    }

    req.body = { ...data, ...req.body };
    try {
      const result = await todoRepo.update(Number(req.params.todoId), req.body);
      return res.status(200).send(result);
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  public async remove(req: Request, res: Response) {
    const todoRepo = AppDataSource.getRepository(Todo);
    const data = await todoRepo.findOne({
      where: { taskId: Number(req.params.taskId), id: Number(req.params.todoId) },
    });
    if (!data) {
      return res.status(400).send("Not find the todo");
    }
    try {
      await todoRepo.delete(Number(req.params.todoId));
      return res.status(200).send({ success: true });
    } catch (e) {
      return res.status(500).send(e);
    }
  }
}

export const todoController = new TodoController();
