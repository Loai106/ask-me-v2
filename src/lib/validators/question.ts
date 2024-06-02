import { z } from 'zod'

export const QuestionValidator = z.object({
  content: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters long',
    })
    .max(280, {
      message: 'Title must be less than 280 characters long',
    }),
    isAnonymous: z.boolean(),
    receiverId : z.string()
  
})

export type QuestionCreationRequest = z.infer<typeof QuestionValidator> 