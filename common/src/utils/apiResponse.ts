import { StatusCodes as HTTPStatusCodes } from 'http-status-codes';

export class APIResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data?: any;
  error?: any;

  /**
   * Constructor for APIResponse class.
   *
   * @param statusCode - The status code of the response.
   * @param success - Indicates whether the request was successful.
   * @param message - A message describing the response.
   * @param data - Optional. Data to be included in the response.
   * @param error - Optional. Error information related to the response.
   */
  constructor(
    statusCode: number,
    success: boolean,
    message: string,
    data: any = null,
    error: any = null,
  ) {
    this.statusCode = statusCode;
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
  }

  // ---------------- Success Responses ------------------- //

  /**
   * @statusCode_200
   * Request successful
   *
   * @param message - Optional. A message describing the success.
   * @param data - Data to be included in the response.
   * @returns APIResponse
   * @example
   * APIResponse.success('User found', { name: 'John', age: 30 });
   */
  static success(message: string = 'Success', data: any): APIResponse {
    return new APIResponse(HTTPStatusCodes.OK, true, message, data, null);
  }

  /**
   * @statusCode_201
   * Resource created successfully.
   *
   * @param message - Optional. A message describing the success.
   * @param data - Data to be included in the response.
   * @returns APIResponse
   * @example
   * APIResponse.created('User created', { id: 1, name: 'Alice' });
   */
  static created(message: string = 'Resource created', data: any): APIResponse {
    return new APIResponse(HTTPStatusCodes.CREATED, true, message, data);
  }

  /**
   * @statusCode_202
   * Processing in background (heavy Async requests )
   *
   * @param message - Optional. A message describing the success.
   * @param data - Data to be included in the response.
   * @returns APIResponse
   * @example
   * APIResponse.accepted('Request accepted', { status: 'pending' });
   */
  static accepted(
    message: string = 'Request accepted',
    data: any,
  ): APIResponse {
    return new APIResponse(HTTPStatusCodes.ACCEPTED, true, message, data);
  }

  /**
   *  @statusCode_204
   *  No need to return any content.
   *
   * @param message - Optional. A message describing the success.
   * @returns APIResponse
   * @example
   * APIResponse.noContent('No content');
   */
  static noContent(message: string = 'No content'): APIResponse {
    return new APIResponse(HTTPStatusCodes.NO_CONTENT, true, message);
  }

  // ---------------- Redirection Responses ------------------- //

  /**
   * @statusCode_304
   * Resource not modified since the last request(from cache).
   *
   * @param message - Optional. A message describing the redirection.
   * @returns APIResponse
   * @example
   * APIResponse.notModified('Resource not modified');
   */
  static notModified(message: string = 'Not modified'): APIResponse {
    return new APIResponse(HTTPStatusCodes.NOT_MODIFIED, true, message);
  }

  // ---------------- Client Error Responses ------------------- //

  /**
   * @statusCode_400
   * Request has missing or invalid information.
   *
   * @param message - Optional. A message describing the error.
   * @param error - Optional. Error information related to the response.
   * @returns APIResponse
   * @example
   * APIResponse.badRequest('Invalid input', { field: 'email', reason: 'missing' });
   */
  static badRequest(message: string = 'Bad request', error?: any): APIResponse {
    return new APIResponse(
      HTTPStatusCodes.BAD_REQUEST,
      false,
      message,
      null,
      error,
    );
  }

  /**
   * @statusCode_401
   * client not authorized to access the resource.
   *
   * @param message - Optional. A message describing the error.
   * @param error - Optional. Error information related to the response.
   * @returns APIResponse
   * @example
   * APIResponse.unauthorized('Access denied', { reason: 'token expired' });
   */
  static unauthorized(
    message: string = 'Unauthorized request',
    error?: any,
  ): APIResponse {
    return new APIResponse(
      HTTPStatusCodes.UNAUTHORIZED,
      false,
      message,
      null,
      error,
    );
  }

  /**
   * @statusCode_403
   * user authenticated but does not have the necessary role/permission.
   *
   * @param message - Optional. A message describing the error.
   * @param error - Optional. Error information related to the response.
   * @returns APIResponse
   * @example
   * APIResponse.forbidden('Permission denied', { role: 'admin' });
   */
  static forbidden(message: string = 'Forbidden', error?: any): APIResponse {
    return new APIResponse(
      HTTPStatusCodes.FORBIDDEN,
      false,
      message,
      null,
      error,
    );
  }

  /**
   * @statusCode_404
   * requested resource does not exist.
   *
   * @param message - Optional. A message describing the error.
   * @param error - Optional. Error information related to the response.
   * @returns APIResponse
   * @example
   * APIResponse.notFound('Resource not found', { type: 'user' });
   */
  static notFound(message: string = 'Not found', error?: any): APIResponse {
    return new APIResponse(
      HTTPStatusCodes.NOT_FOUND,
      false,
      message,
      null,
      error,
    );
  }

  /**
   * @statusCode_405
   * unsupported HTTP method.
   *
   * @param message - Optional. A message describing the error.
   * @param error - Optional. Error information related to the response.
   * @returns APIResponse
   * @example
   * APIResponse.methodNotAllowed('Method not allowed', { method: 'DELETE' });
   */
  static methodNotAllowed(
    message: string = 'Method not allowed',
    error?: any,
  ): APIResponse {
    return new APIResponse(
      HTTPStatusCodes.METHOD_NOT_ALLOWED,
      false,
      message,
      null,
      error,
    );
  }

  /**
   * @statusCode_406
   * content-type not supported by the server.
   *
   * @param message - Optional. A message describing the error.
   * @param error - Optional. Error information related to the response.
   * @returns APIResponse
   * @example
   * APIResponse.notAcceptable('Invalid content type', { type: 'application/xml' });
   */
  static notAcceptable(
    message: string = 'Not acceptable',
    error?: any,
  ): APIResponse {
    return new APIResponse(
      HTTPStatusCodes.NOT_ACCEPTABLE,
      false,
      message,
      null,
      error,
    );
  }

  /**
   * @statusCode_407
   * Client must authenticate to use the proxy.
   *
   * @param message - Optional. A message describing the error.
   * @param error - Optional. Error information related to the response.
   * @returns APIResponse
   * @example
   * APIResponse.proxyAuthenticationRequired('Authentication required', { proxy: 'proxy.example.com' });
   */
  static proxyAuthenticationRequired(
    message: string = 'Proxy authentication required',
    error?: any,
  ): APIResponse {
    return new APIResponse(
      HTTPStatusCodes.PROXY_AUTHENTICATION_REQUIRED,
      false,
      message,
      null,
      error,
    );
  }

  /**
   * @statusCode_409
   * conflict with the server's state
   *
   * @param message - Optional. A message describing the error.
   * @param error - Optional. Error information related to the response.
   * @returns APIResponse
   * @example
   * APIResponse.conflict('Conflict occurred', { resource: 'user', id: 123 });
   */
  static conflict(
    message: string = 'Conflict occurred',
    error?: any,
  ): APIResponse {
    return new APIResponse(
      HTTPStatusCodes.CONFLICT,
      false,
      message,
      null,
      error,
    );
  }

  /**
   * @statusCode_417
   * Failure due to unmet expectations or preconditions.
   * Example: If a client's conditional request header fields don't match the server's expectations.
   * The client should adjust its request and retry.
   *
   * @param message - Optional. A message describing the error.
   * @param error - Optional. Error information related to the response.
   * @returns APIResponse
   * @example
   * APIResponse.expectationFailed('Conditional request failed', { header: 'If-Match' });
   */
  static expectationFailed(
    message: string = 'Expectation failed',
    error?: any,
  ): APIResponse {
    return new APIResponse(
      HTTPStatusCodes.EXPECTATION_FAILED,
      false,
      message,
      null,
      error,
    );
  }

  /**
   * @statusCode_415
   * media type not supported by the server.
   *
   * @param message - Optional. A message describing the error.
   * @param error - Optional. Error information related to the response.
   * @returns APIResponse
   * @example
   * APIResponse.unsupportedMediaType('Unsupported media type', { type: 'application/json' });
   */
  static unsupportedMediaType(
    message: string = 'Unsupported media type',
    error?: any,
  ): APIResponse {
    return new APIResponse(
      HTTPStatusCodes.UNSUPPORTED_MEDIA_TYPE,
      false,
      message,
      null,
      error,
    );
  }

  /**
   * @statusCode_424
   * Failure due to a dependency failure : May not fail later
   * Example : If the request depends on another request that failed,
   *  or unable to perform the request due to a third-party service failure.
   *
   * @param message - Optional. A message describing the error.
   * @param error - Optional. Error information related to the response.
   * @returns APIResponse
   * @example
   * APIResponse.failed('Dependency failed', { service: 'payment' });
   */
  static failed(message: string = 'Failed', error?: any): APIResponse {
    return new APIResponse(
      HTTPStatusCodes.FAILED_DEPENDENCY,
      false,
      message,
      null,
      error,
    );
  }

  /**
   * @statusCode_429
   * too many requests in a given amount of time, request rate limit exceeded.
   *
   * @param message - Optional. A message describing the error.
   * @param error - Optional. Error information related to the response.
   * @returns APIResponse
   * @example
   * APIResponse.tooManyRequests('Rate limit exceeded', { limit: 100 });
   */
  static tooManyRequests(
    message: string = 'Too many requests. please try after sometime',
    error?: any,
  ): APIResponse {
    return new APIResponse(
      HTTPStatusCodes.TOO_MANY_REQUESTS,
      false,
      message,
      null,
      error,
    );
  }

  // ---------------- Server Error Responses ------------------- //

  /**
   * @statusCode_500
   * Server error or unexpected error.
   *
   * @param message - Optional. A message describing the error.
   * @param error - Optional. Error information related to the response.
   * @returns APIResponse
   * @example
   * APIResponse.internalServerError('Internal server error', { reason: 'database connection failure' });
   */
  static internalServerError(
    message: string = 'Internal server error',
    error?: any,
  ): APIResponse {
    return new APIResponse(
      HTTPStatusCodes.INTERNAL_SERVER_ERROR,
      false,
      message,
      null,
      error,
    );
  }

  /**
   * @statusCode_501
   * Not implemented
   *
   * @param message - Optional. A message describing the error.
   * @param error - Optional. Error information related to the response.
   * @returns APIResponse
   * @example
   * APIResponse.notImplemented('Feature not implemented', { feature: 'payment' });
   */
  static notImplemented(
    message: string = 'Not implemented',
    error?: any,
  ): APIResponse {
    return new APIResponse(
      HTTPStatusCodes.NOT_IMPLEMENTED,
      false,
      message,
      null,
      error,
    );
  }

  /**
   * @statusCode_503
   * service is not available.
   * requested resource  does not exist.
   *
   * @param message - Optional. A message describing the error.
   * @param error - Optional. Error information related to the response.
   * @returns APIResponse
   * @example
   * APIResponse.serviceUnavailable('Service unavailable', { service: 'payment' });
   */
  static serviceUnavailable(
    message: string = 'Service unavailable',
    error?: any,
  ): APIResponse {
    return new APIResponse(
      HTTPStatusCodes.SERVICE_UNAVAILABLE,
      false,
      message,
      null,
      error,
    );
  }
}
