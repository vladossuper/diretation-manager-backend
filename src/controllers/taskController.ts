import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { Error } from 'mongoose';
import { ITask, Priority, Status, Task } from '../Models/Task';
interface ITaskRequest {
  student_id: string;
  title: string;
  description: string;
  priority: Priority;
  estimation: number;
  leader_id: string;
  status: Status;
  scope_id?: string;
}

interface ITasksRequest {
  user_id: string;
};

interface ITaskDelete {
  task_id: string;
};

interface IUpdateTask {
  task_id: string;
  update: {
    title?: string;
    description?: string;
    student_id?: string;
    priority?: Priority;
    status?: Status;
    estimation?: number;
    scope_id?: string;
  }
};

export const createTask = async (req: Request<ITaskRequest>, res: Response) => {
  const { student_id, title, description, priority, estimation, leader_id, status, scope_id } = req.body;

  const task = new Task({
    task_id: v4(),
    student_id,
    title,
    description,
    priority,
    estimation,
    leader_id,
    status,
    creation_date: new Date(),
    scope_id
  });

  await task.save(async (err: Error) => {
    if (err) {
      return res.status(400).json({
        title: 'Error',
        error: 'Error with creation'
      })
    }
    return res.status(200).json({
      title: 'signup success',
      task,
    })
  })
};

export const getTasksCreatedByLeader = async (req: Request<ITasksRequest>, res: Response) => {
  const { user_id } = req.query;

  await Task.find({ leader_id: String(user_id) }, (err: Error, tasks: Array<ITask>) => {
    if (err) {
      return res.status(400).json({
        title: 'Error',
        error: 'Error with loading task'
      })
    }

    if (!tasks.length) {
      return res.status(200).json({
        title: 'Success',
        tasks: [],
      })
    }

    return res.status(200).json({
      title: 'Success',
      tasks,
    })
  })
}

export const getTasksForStudent = async (req: Request<ITasksRequest>, res: Response) => {
  const { user_id } = req.query;

  await Task.find({ student_id: String(user_id) }, (err: Error, tasks: Array<ITask>) => {
    console.log({ tasks });
    if (err) {
      return res.status(400).json({
        title: 'Error',
        error: 'Error with loading task'
      })
    }

    if (!tasks.length) {
      return res.status(200).json({
        title: 'Success',
        tasks: [],
      })
    }

    return res.status(200).json({
      title: 'Success',
      tasks,
    })
  })
};

export const deleteTask = async (req: Request<ITaskDelete>, res: Response) => {
  const { task_id } = req.body;

  Task.findOneAndDelete({ task_id: String(task_id) }, (err: Error) => {
    if (err) return res.status(500).json({
      title: 'Server error',
      error: err
    });
    return res.status(200).json({
      title: 'Success',
    });
  });
};

export const updateTask = async (req: Request<IUpdateTask>, res: Response) => {
  const { task_id, update } = req.body;

  console.log({ update })

  Task.findOneAndUpdate({ task_id }, update, (err: Error, task: ITask) => {
    if (err) {
      return res.status(500).json({
        title: 'Server error',
        error: err,
      })
    }

    return res.status(200).json({
      title: 'Success',
      task
    })
  })
}