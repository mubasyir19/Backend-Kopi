import { z } from 'zod';

export const authValidation = {
  login: z.object({
    username: z.string().nonempty('Username is required').min(3),
    password: z.string().nonempty('Password is required').min(6),
  }),
  register: z.object({
    name: z.string().nonempty('Name is required').min(1, 'Name is required'),
    username: z.string().nonempty('Username is required').min(3, 'Username must be at least 3 characters'),
    password: z.string().nonempty('Password is required').min(6, 'Password must be at least 6 characters'),
    role: z
      .string()
      .nonempty('Role is required')
      .refine((val) => ['SuperAdmin', 'Barista', 'Cashier', 'Customer'].includes(val), {
        message: 'Role is invalid. Please choose a valid role.',
      }),
  }),
};

export type RegisterUser = z.infer<typeof authValidation.register>;
export type LoginUser = z.infer<typeof authValidation.login>;
