import { Blog } from '@prisma/client';
import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { IUser } from '../middleware/auth';
import {deleteTodoSchemaType} from '../zod_schema/blog.schema';

export const getAllTodoHandler = async (req: Request, res: Response) => {
  const user = res.locals.user as IUser;

  const todoList = await prisma.blog.findMany({
    where: { user_id: user.id },
  });

  return res.status(200).json(todoList);
};

export const addTodoHandler = async (req: Request, res: Response) => {
  const { title,message } = req.body as Blog;
  const user = res.locals.user as IUser;

  await prisma.blog.create({
    data: {
    message,
    title,
    user_id:user.id
    },
  });

  return res.status(201).json({
    message: 'New Blog created for user : ' + user.id,
  });
};


export const deleteTodoHandler = async (req: Request, res: Response) => {
  const user = res.locals.user as IUser;
  const { todoidd } = req.params as deleteTodoSchemaType;

  const deleteCount = await prisma.blog.deleteMany({
    where: {
      id: todoidd,
      user_id: user.id,
    },
  });

  if (deleteCount.count == 0) {
    return res.status(400).json({
      message: 'Invalid Blog id',
    });
  }

  return res.status(200).json({
    message: 'Blog deleted !',
  });
};
