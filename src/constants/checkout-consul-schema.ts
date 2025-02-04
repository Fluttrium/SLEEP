import { z } from 'zod';

export const checkoutConsulSchema = z.object({
    firstName: z.string().min(2, { message: 'Имя должно содержать не менее 2-х символов' }),
    lastName: z.string().min(2, { message: 'Фамилия должна содержать не менее 2-х символов' }),
    email: z.string().email({ message: 'Введите корректную почту' }),
    phone: z.string().min(10, { message: 'Введите корректный номер телефона' }),
    comment: z.string().optional(),
});

export type checkoutConsulValue = z.infer<typeof checkoutConsulSchema>;
