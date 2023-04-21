import { hashSync } from "bcryptjs";
import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().transform((pass) => {
    return hashSync(pass, 10);
  }),
  admin: z.boolean().optional(),
  active: z.boolean().optional(),
});

const requestUserSchema = userSchema.omit({ id: true });

const responseUserSchema = userSchema.omit({ password: true });

const updateUserSchema = requestUserSchema.partial();

export { userSchema, requestUserSchema, responseUserSchema, updateUserSchema };
