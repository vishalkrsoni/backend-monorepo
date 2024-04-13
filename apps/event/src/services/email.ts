import { logger, emailOptions, transporter } from '@backend-monorepo/common';

const { GMAIL_EMAIL, GMAIL_EMAIL_RECIPIENT } = process.env;

const sendContactInfoService = async (
  name: string,
  email: string,
  subject: string,

  message: string
): Promise<boolean> => {
  try {
    const emailRegex =
      /^(?=.{1,50}$)[a-zA-Z0-9+]+(\.[a-zA-Z0-9]+)*@[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,}){1}(?!\.)$/;

    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    const mailResponse = await transporter.sendMail(
      emailOptions(GMAIL_EMAIL, GMAIL_EMAIL_RECIPIENT, subject, message)
    );

    if (mailResponse) {
      logger.info(`email received from ${name} via email: ${email}`);
      return true;
    } else {
      throw new Error('Error sending email');
    }
  } catch (error) {
    logger.error('Email sending failed', error);
    throw error;
  }
};

export default sendContactInfoService;
