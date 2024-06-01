import { z } from 'zod'

export const AnswerValidator = z.object({
  answer: z
    .string()
    .min(1, {
      message: 'Title must be at least 1 characters long',
    })
    .max(280, {
      message: 'Title must be less than 280 characters long',
    }),
    questionId: z.string()
  
})

export type AnswerCreationRequest = z.infer<typeof AnswerValidator> 