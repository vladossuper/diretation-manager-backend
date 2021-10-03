import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IScope {
  scope_id: string;
  name: string;
  date_start: Date;
  date_end: Date;
  created_by_user: string
}

const scope = new Schema<IScope>({
  scope_id: {
    unique: true,
    type: String
  },
  name: String,
  date_start: Date,
  date_end: Date,
  created_by_user: String,
});

export const Scope = mongoose.model('Scope', scope);