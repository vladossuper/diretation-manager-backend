import { Request, Response } from 'express';
import multer, { Multer } from 'multer';
import fs from 'fs';
import { File } from '../Models/File';
import { v4 } from 'uuid';
import { Error } from 'mongoose';

type MulterFile = {
  fieldname: string,
  originalname: string,
  encoding: string,
  mimetype: string,
  destination: string,
  filename: string,
  path: string,
  size: number
}

interface ITaskFilesRequest {
  task_id: string;
}

interface IDownload {
  path: string;
}

interface IDeleteFile {
  path: string;
  file_id: string;
}

const DIR = './uploads';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(DIR, { recursive: true })
    cb(null, DIR)
  },
  filename: (req, file, cb) => {  
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage }).array('file');

export const uploadFile = async (req: Request, res: Response) => {
  upload(req, res, (err) => {
    const { task_id, user_id, comments } = req.body;

    const files = req.files as MulterFile[];

    files.forEach(async (file: MulterFile) => {
      const newFile = new File({
        file_id: v4(),
        original_name: file.originalname,
        file_name: file.filename,
        task_id,
        user_id,
        file_path: file.path,
        comments,
      });

      await newFile.save(async (err: Error) => {
        if (err) {
          return res.status(400).json({
            title: 'Error',
            error: 'Error with creation'
          })
        }
        return res.status(200).json({
          title: 'File created',
          newFile,
        })
      }).clone()
    });
  })
}

export const getFilesForTask = async (req: Request<ITaskFilesRequest>, res: Response) => {
  const { task_id } = req.query;

  await File.find({ task_id: String(task_id) }, (err: Error, files: MulterFile[]) => {
    if (err) {
      return res.status(400).json({
        title: 'Error',
        error: 'Error with getting files'
      });
    }

    if (!files.length) {
      return res.status(200).json({
        title: 'Success',
        files: []
      })
    };

    return res.status(200).json({
      title: 'Success',
      files,
    })
  }).clone()
}

export const download = async (req: Request<IDownload>, res: Response) => {
  const { path } = req.query;

  try {
    const file = `${process.cwd()}/${path}`;
    const filestream = fs.createReadStream(file);

    filestream.pipe(res);
  } catch (err) {
    return res.status(400).json({
      title: 'Error',
      error: 'Something went wrong',
    });
  }
}

export const deleteFile = async (req: Request<IDeleteFile>, res: Response) => {
  const { path, file_id } = req.body;

  try {
    const file = `${process.cwd()}/${path}`;

    await fs.unlink(file, async (err: Error) => {
      if (err) {
        return res.status(400).json({
          title: 'Error',
          error: err
        })
      }

      await File.findOneAndDelete({ file_id: String(file_id) }, (err: Error) => {
        if (err) {
          console.log('delete from db error');
          return res.status(400).json({
            title: 'Error',
            error: 'Something went wrong'
          })
        }

        return res.status(200).json({
          title: 'Success',
          description: 'Successfully deleted'
        })
      }).clone();

      return res.status(200).json({
        title: 'Success',
      })
    });


  } catch (err) {
    return res.status(400).json({
      title: 'Error',
      error: 'Something went wrong',
    });
  }
}