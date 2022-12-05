import { z } from 'zod';

export const addTodoSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required !',
        invalid_type_error: 'Title must be a string',
      })
      .min(2, 'Title must be more than 2 char'),

      message:z
        .string({
            required_error: 'Message is required !',
        invalid_type_error: 'Message must be a string',

        })
      })
  })


export const deleteTodoSchema = z.object({
  params: z.object({
    todoidd: z.string({
      required_error: 'id is required !',
      invalid_type_error: 'todo id must be a string',
    }),
  }),
});

export type deleteTodoSchemaType = z.infer<typeof deleteTodoSchema>['params'];

