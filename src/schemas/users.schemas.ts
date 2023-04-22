import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
  admin: z.boolean().optional(),
  active: z.boolean().optional(),
});
const authSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
  admin: z.boolean(),
  active: z.boolean().optional(),
});

const requestUserSchema = userSchema.omit({ id: true });

const responseUserSchema = userSchema.omit({ password: true });

const updateUserSchema = requestUserSchema.partial();

export {
  userSchema,
  requestUserSchema,
  responseUserSchema,
  updateUserSchema,
  authSchema,
};
