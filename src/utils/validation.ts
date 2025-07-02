import { z } from 'zod';

export const authValidation = {
  register: z.object({
    name: z.string().min(1, 'Name is required'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.string().refine((val) => ['SuperAdmin', 'Barista', 'Cashier', 'Customer'].includes(val), {
      message: 'Role is invalid. Please choose a valid role.',
    }),
  }),
};

export type RegisterUser = z.infer<typeof authValidation.register>;
