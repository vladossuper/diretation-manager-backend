import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export type Priority = 'low' | 'medium' | 'high';
export type Status = 'to_do' | 'in_progress' | 'in_test' | 'done';

export interface ITask {
  task_id: string;
  student_id: string;
  title: string;
  description: string;
  priority: Priority;
  estimation: number;
  leader_id: string;
  status: Status;
  creation_date: Date;
  scope_id?: string;
}

const task = new Schema<ITask>({
  task_id: {
    unique: true,
    type: String,
  },
  student_id: String,
  title: String,
  description: String,
  priority: String,
  estimation: Number,
  leader_id: String,
  status: String,
  creation_date: Date,
  scope_id: String,
});

export const Task = mongoose.model('Task', task);