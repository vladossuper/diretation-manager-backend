import { Request, Response } from 'express';
import { escapeLeadingUnderscores } from 'typescript';
import { User, IUser, Role } from '../Models/User';

interface IUserRequest {
  user_id: string;
};

interface IUsersRequest {
  role: Role
}

export const user = async (req: Request<IUserRequest>, res: Response) => {
  const { user_id } = req.query;

  await User.findOne({ user_id: String(user_id) }, (err: Error, user: IUser) => {
    if (err) return console.log(err);

    const { name, surname, email, role, user_id } = user;

    return res.status(200).json({
      title: 'user grabbed',
      user: {
        email,
        name,
        surname,
        user_id,
        role,
      }
    })
  });
};

export const users = async (req: Request<IUsersRequest>, res: Response) => {
  const { role } = req.query;

  await User.find({ role: role as Role }, (err: Error, users: Array<IUser>) => {
    if (err) return console.log(err);

    return res.status(200).json({
      title: 'Users list',
      users: users.map((user) => ({ user_id: user.user_id, email: user.email, name: user.name, surname: user.surname, role: user.role }))
    })
  });
};