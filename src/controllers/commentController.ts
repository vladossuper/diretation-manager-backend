import { Request, Response } from 'express';
import { Comment, IComment } from '../Models/Comment';
import { v4 } from 'uuid';
import { Error } from 'mongoose';

interface ICommentRequest {
  description: string,
  author: string,
  comment_to_file: string,
  reply_to_comment?: string,
  user_id: string,
  task_id: string
};

interface ICommentDelete {
  comment_id: string
};

interface ICommentsByTask {
  task_id: string;
}

export const createComment = async (req: Request<ICommentRequest>, res: Response) => {
  const { description, author, comment_to_file, reply_to_comment, user_id, task_id } = req.body;

  const newComment = new Comment({
    comment_id: v4(),
    description,
    author,
    creation_date: new Date(),
    comment_to_file,
    reply_to_comment,
    user_id,
    task_id,
  });

  await newComment.save((err: Error) => {
    if (err) {
      return res.status(400).json({
        title: 'Error',
        error: 'Error with creation'
      })
    }

    return res.status(200).json({
      title: 'Comment created',
      comment: newComment,
    })
  })
};

export const deleteComment = async (req: Request<ICommentDelete>, res: Response) => {
  const { comment_id } = req.body;

  await Comment.findOneAndDelete({ comment_id: String(comment_id) }, (err: Error) => {
    if (err) return res.status(500).json({
      title: 'Server error',
      error: err
    });
    return res.status(200).json({
      title: 'Success',
    });
  })
};

export const getCommentByTask = async (req: Request<ICommentsByTask>, res: Response) => {
  const { task_id } = req.query;

  await Comment.find({ task_id: String(task_id) }, (err: Error, comments: IComment[]) => {
    if (err) {
      return res.status(400).json({
        title: 'Error',
        error: 'Error with loading comments'
      })
    }

    if (!comments.length) {
      return res.status(200).json({
        title: 'Success',
        coments: [],
      })
    }

    return res.status(200).json({
      title: 'Success',
      comments,
    })
  })
};