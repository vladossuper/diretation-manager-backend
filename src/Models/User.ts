import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export type Role = 'student' | 'leader';

export interface IUser {
  user_id: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  role: Role;
}

const user = new Schema<IUser>({
  user_id: String,
  email: {
    unique: true,
    type: String
  },
  password: String,
  name: String,
  surname: String,
  role: String,
});

export const User = mongoose.model('User', user);