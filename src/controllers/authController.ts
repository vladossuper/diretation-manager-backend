import { Request, Response } from 'express';
import { hashSync, compareSync } from 'bcrypt';
import { v4 } from 'uuid';
import { Error } from 'mongoose';
import { sign } from 'jsonwebtoken';

import { Role, User, IUser } from '../Models/User';

interface IRegisterRequest{
  name: string;
  surname: string;
  email: string;
  password: string;
  role: Role
};

interface ILoginRequest {
  email: string;
  password: string;
}

export const register = async (req: Request<IRegisterRequest>, res: Response) => {
  const { name, surname, email, password, role } = req.body;

  const newUser = new User({
    user_id: v4(),
    email,
    name,
    surname,
    password: hashSync(password, 10),
    role,
  })

  await newUser.save(async (err: Error) => {
    if (err) {
      return res.status(400).json({
        title: 'error',
        error: 'email in use'
      })
    }
    return res.status(200).json({
      title: 'signup success',
      user: newUser,
    })
  })
};

export const login = async (req: Request<ILoginRequest>, res: Response) => {
  const { email, password } = req.body;

  await User.findOne({ email }, async (err: Error, user: IUser) => {
    if (err){ 
      return res.status(500).json({
        title: 'server error',
        error: err
      })
    }

    if (!user) {
      return res.status(401).json({
        title: 'user not found',
        error: 'invalid credentials'
      })
    }
    //incorrect password
    if (!compareSync(password, user.password)) {
      return res.status(401).json({
        titte: 'login failed',
        error: 'invalid credentials'
      })
    }
    //IF ALL IS GOOD create a token and send to frontend
    const token = sign({ userId: user.user_id}, 'secretkey');
    return res.status(200).json({
      title: 'login sucess',
      token: token,
      user
    })
  })
}