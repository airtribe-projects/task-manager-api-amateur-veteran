import { Request, Response } from 'express';

import tasksRepo from '../repos/tasks_repo';

async function listTasks(req: Request, res: Response) {
  const tasks = await tasksRepo.listTasks();
  res.json(tasks);
}

async function getTask(req: Request, res: Response) {
  const id = req.params.id;
  const task = await tasksRepo.getTask(Number(id));
  if (!task) {
    res.sendStatus(404);
  } else {
    res.json(task);
  }
}

async function createTask(req: Request, res: Response) {
  const task = req.body;
  if (!task.title || !task.description || typeof task.completed !== 'boolean') { // is there a better way to validate..
    res.sendStatus(400);
  } else {
    const newTask = await tasksRepo.createTask(task);
    res.status(201).json(newTask);
  }
}

async function updateTask(req: Request, res: Response) {
  const id = req.params.id;
  const task = req.body;
  if (!task.title || !task.description || typeof task.completed !== 'boolean') { // is there a better way to validate..
    res.sendStatus(400);
  } else {
    const updatedTask = await tasksRepo.updateTask(Number(id), task);
    if (!updatedTask) {
      res.sendStatus(404);
    } else {
      res.json(updatedTask);
    }
  }
}

async function deleteTask(req: Request, res: Response) {
  const id = req.params.id;
  const task = await tasksRepo.getTask(Number(id));
  if (!task) {
    res.sendStatus(404);
  } else {
    await tasksRepo.deleteTask(Number(id));
    res.sendStatus(200);
  }
}

export default {
  listTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
