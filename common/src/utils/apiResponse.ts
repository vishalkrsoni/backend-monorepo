import { StatusCodes as HTTPStatusCodes } from 'http-status-codes';

export class APIResponse {
  status: number;
  success: boolean;
  message: string;
  data?: any;
  error?: { status: number; message: string; value?: any };

  constructor(
    status: number,
    success: boolean,
    message: string,
    data: any = null,
    error: any = null
  ) {
    this.status = status;
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
  }

  static success(data: any, message: string = 'Success'): APIResponse {
    return new APIResponse(HTTPStatusCodes.OK, true, message, data);
  }

  static created(data: any, message: string = 'Resource created'): APIResponse {
    return new APIResponse(HTTPStatusCodes.CREATED, true, message, data);
  }

  static badRequest(
    message: string = 'Bad request',
    error: any = null
  ): APIResponse {
    return new APIResponse(
      HTTPStatusCodes.BAD_REQUEST,
      false,
      message,
      null,
      error
    );
  }

  static unauthorized(
    message: string = 'Unauthorized',
    error: any = null
  ): APIResponse {
    return new APIResponse(
      HTTPStatusCodes.UNAUTHORIZED,
      false,
      message,
      null,
      error
    );
  }

  static forbidden(
    message: string = 'Forbidden',
    error: any = null
  ): APIResponse {
    return new APIResponse(
      HTTPStatusCodes.FORBIDDEN,
      false,
      message,
      null,
      error
    );
  }

  static notFound(
    message: string = 'Not found',
    error: any = null
  ): APIResponse {
    return new APIResponse(
      HTTPStatusCodes.NOT_FOUND,
      false,
      message,
      null,
      error
    );
  }

  static internalServerError(
    message: string = 'Internal server error',
    error: any = null
  ): APIResponse {
    return new APIResponse(
      HTTPStatusCodes.INTERNAL_SERVER_ERROR,
      false,
      message,
      null,
      error
    );
  }
}
