
import nodemailer, { Transporter } from 'nodemailer';

export const sendEmail = async (
    to: string,
    subject: string,
    htmlContent: string
): Promise<void> => {
    try {
        const transporter: Transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST as string, // Хост SMTP-сервера
            port: Number(process.env.SMTP_PORT), // Порт SMTP
            secure: false, // Если true, используется SSL
            auth: {
                user: process.env.SMTP_USER as string, // Логин (например, email)
                pass: process.env.SMTP_PASSWORD as string, // Пароль
            },
        });

        const info = await transporter.sendMail({
            from: `"Your Name" <${process.env.SMTP_USER}>`, // Отправитель
            to, // Кому
            subject, // Тема письма
            html: htmlContent, // HTML-содержимое письма
        });

        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};
