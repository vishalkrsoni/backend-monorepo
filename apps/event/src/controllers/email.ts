import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import sendContactInfoService from '../services/email';
const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = StatusCodes;

const sendContactInfoController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(BAD_REQUEST).json({
        message: 'Name, email, and message are required fields',
        status: 'error',
        statusCode: BAD_REQUEST,
      });
    }

    const success = await sendContactInfoService(
      name,
      email,
      'subject',
      message
    );

    if (success) {
      return res.status(OK).json({
        message: 'Email send successfully',
        status: 'success',
        statusCode: OK,
        data: null,
      });
    } else {
      return res.status(BAD_REQUEST).json({
        message: 'Error sending email',
        status: 'error',
        statusCode: BAD_REQUEST,
        data: null,
      });
    }
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      message: 'Email send failed',
      status: 'error',
      statusCode: INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

export default sendContactInfoController;
