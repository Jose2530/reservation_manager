import nodemailer from 'nodemailer';
import config from '../../config';

const transporter = nodemailer.createTransport({
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    secure: false,
    auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS,
    },
});

const sendEmail = async (to: string, subject: string, body: string) => {
    const confirmationMessage = `\n\nEste es un mensaje de confirmación de que su solicitud ha sido recibida y procesada.`;
    const fullBody = `${body}${confirmationMessage}`;

    const mailOptions = {
        from: config.SES_SOURCE_EMAIL,
        to: to,
        subject: subject,
        text: fullBody,
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        return { success: true, message: 'Email enviado correctamente', result };
    } catch (err: any) {
        console.error('Error al enviar email:', err);
        return { success: false, message: err.message };
    }
};

export default sendEmail;