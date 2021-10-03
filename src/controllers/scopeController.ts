import { Request, Response } from "express";
import { Error } from "mongoose";
import { v4 } from 'uuid';
import { IScope, Scope } from '../Models/Scope';

interface IScopeCreationRequest {
  name: string;
  date_start: Date;
  date_end: Date;
  created_by_user: string;
}

interface IUpdateScopeRequest {
  scope_id: string;
  update: {
    name?: string;
    date_start?: Date;
    date_end?: Date;
  }
}

export const createScope = async (req: Request<IScopeCreationRequest>, res: Response) => {
  const { name, date_start, date_end, created_by_user } = req.body;
  
  const scope = new Scope({
    scope_id: v4(),
    name,
    date_start,
    date_end,
    created_by_user,
  });

  await scope.save(async (err: Error) => {
    if (err) {
      return res.status(400).json({
        title: 'Error',
        error: 'Error with creation'
      })
    }
    return res.status(200).json({
      title: 'Scope created',
      scope,
    })
  })
};

export const getScopesCreatedByUser = async (req: Request<{ user_id: string }>, res: Response) => {
  const { user_id } = req.query;

  await Scope.find({ created_by_user: String(user_id) }, (err: Error, scopes: Array<IScope>) => {
    if (err) {
      return res.status(400).json({
        title: 'Error',
        error: 'Error with loading scopes'
      })
    }

    if (!scopes.length) {
      return res.status(200).json({
        title: 'Success',
        scopes: [],
      })
    }

    return res.status(200).json({
      title: 'Success',
      scopes,
    })
  })
};

export const getScopes = async (req: Request, res: Response) => {

  await Scope.find({}, (err: Error, scopes: Array<IScope>) => {
    if (err) {
      return res.status(400).json({
        title: 'Error',
        error: 'Error with loading scopes'
      })
    }

    if (!scopes.length) {
      return res.status(200).json({
        title: 'Success',
        scopes: [],
      })
    }

    return res.status(200).json({
      title: 'Success',
      scopes,
    })
  })
};

export const deleteScope = async (req: Request<{ scope_id: string }>, res: Response) => {
  const { scope_id } = req.body;

  Scope.findOneAndDelete({ scope_id: String(scope_id) }, (err: Error) => {
    if (err) return res.status(500).json({
      title: 'Server error',
      error: err
    });
    return res.status(200).json({
      title: 'Success',
    });
  });
}

export const updateScope = async (req: Request<IUpdateScopeRequest>, res: Response) => {
  const { scope_id, update } = req.body;

  console.log({ update })

  Scope.findOneAndUpdate({ scope_id }, update, (err: Error, scope: IScope) => {
    if (err) {
      return res.status(500).json({
        title: 'Server error',
        error: err,
      })
    }

    return res.status(200).json({
      title: 'Success',
      scope
    })
  })
}
