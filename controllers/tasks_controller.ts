import { Request, Response } from 'express';

import tasksRepo from '../repos/tasks_repo';

async function listTasks(req: Request, res: Response) {
  try {
    const valueMap: { [key: string]: boolean | undefined } = {
      'true': true,
      'false': false,
    };
    const completedStatusRaw = req.query.completed as string;
    const completedStatus = valueMap[completedStatusRaw];

    if (completedStatusRaw && completedStatus === undefined) {
      res.sendStatus(400).json({ error: 'Invalid completed status value' });
    }

    const tasks = await tasksRepo.listTasks({ completedStatus });
    res.json(tasks);
  } catch (error) {
    res.sendStatus(500).json({ error: 'Failed to list tasks' });
  }
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
  if (!task.title || !task.description || typeof task.completed !== 'boolean' || !['low', 'medium', 'high', undefined].includes(task.level)) { // is there a better way to validate..
    res.sendStatus(400);
  } else {
    const newTask = await tasksRepo.createTask(task);
    res.sendStatus(201).json(newTask);
  }
}

async function updateTask(req: Request, res: Response) {
  const id = req.params.id;
  const task = req.body;
  if (!task.title || !task.description || typeof task.completed !== 'boolean' || !['low', 'medium', 'high', undefined].includes(task.level)) { // is there a better way to validate..
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

async function getTasksByPriority(req: Request, res: Response) {
  const level = req.params.level;
  if (!['low', 'medium', 'high'].includes(level)) res.sendStatus(404);
  const tasks = await tasksRepo.getTasksByPriority(level);
  res.json(tasks);
}

export default {
  listTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTasksByPriority,
};
