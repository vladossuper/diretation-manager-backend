import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IComment {
  comment_id: string;
  description: string,
  author: string,
  creation_date: Date,
  comment_to_file: string,
  reply_to_comment?: string,
  user_id: string,
  task_id: string,
}

const comment = new Schema<IComment>({
  comment_id: {
    unique: true,
    type: String
  },
  description: String,
  author: String,
  creation_date: Date,
  comment_to_file: String,
  reply_to_comment: String,
  user_id: String,
  task_id: String,
});

export const Comment = mongoose.model('Comment', comment);