import * as nodemailer from 'nodemailer';

const { NODEMAILER_SERVICE, GMAIL_EMAIL, GMAIL_PASSWORD } = process.env;

let config = {
  service: NODEMAILER_SERVICE,
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_PASSWORD,
  },
};

export const transporter = nodemailer.createTransport(config);
