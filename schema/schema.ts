import { z } from "zod";

export const FormSchema = z.object({
  in_progress: z.boolean().default(false).optional(),
  userId: z.string(),
  canceled: z.boolean().default(false).optional(),
  todo: z.boolean().default(false).optional(),
  completed: z.boolean().default(false).optional(),
  title: z.string().min(8, {
    message: "Task title must be at least 8 characters.",
  }),
  tech_stack: z.string().optional(),
  priority: z.string().optional(),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  status: z.string().optional(),
});

export const taskSchema = z.object({
  id: z.string(),
  username: z.string(),
  title: z.string(),
  status: z.string(),
  tech_stack: z.string(),
  priority: z.string(),
  userId: z.string(),
});

export const userAuthSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "You've not specified an email or not a valid email",
    }),
  // name: z
  //   .string({
  //     required_error: "Names are required",
  //   })
  //   .min(6, {
  //     message: "Names too short - should be 6 chars minimum",
  //   }),

  // password: z
  //   .string({
  //     required_error: "Password is required",
  //   })
  //   .min(8, {
  //     message: "Password too short - should be 8 chars minimum",
  //   }),
});

export type Task = z.infer<typeof taskSchema>;
