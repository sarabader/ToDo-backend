import express from 'express';
import {
  addTodoHandler,
  deleteTodoHandler,
  getAllTodoHandler,
} from '../controller/blog.controller';
import { protect } from '../middleware/auth';
import validate from '../middleware/validate';
import {
  addTodoSchema,
  deleteTodoSchema,
} from '../zod_schema/blog.schema';

const router = express.Router();

router.get('/', protect, getAllTodoHandler);
router.post('/', protect, validate(addTodoSchema), addTodoHandler);
router.delete(
  '/:todoid',
  protect,
  validate(deleteTodoSchema),
  deleteTodoHandler
);

export default router;
