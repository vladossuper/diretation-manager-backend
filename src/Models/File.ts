import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IFile {
  file_id: string;
  original_name: string,
  file_name: string,
  file_path: string;
  task_id: string;
  user_id: string;
  comments?: Array<string>;
}

const file = new Schema<IFile>({
  file_id: {
    unique: true,
    type: String
  },
  original_name: String,
  file_name: String,
  file_path: String,
  task_id: String,
  user_id: String,
  comments: [{ type: String }],
});

export const File = mongoose.model('File', file);