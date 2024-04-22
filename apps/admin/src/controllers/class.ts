import { Request, Response } from 'express';
import { classService } from '../store';
import { ClassService } from '../services/class';
import { APIResponse, BaseController } from '@backend-monorepo/common';
import { StatusCodes as HTTPStatusCodes } from 'http-status-codes';
import { HttpStatusCode } from 'axios';

export class ClassController extends BaseController<ClassService> {
  constructor() {
    super(classService);
  }

  async addClass(req: Request, res: Response) {
    try {
      const newClass = await classService.addClass(req.body);
      res.status(HttpStatusCode.Created).json(
        APIResponse.success('Added new class successfully', {
          warning: req.body.warning,
          class: newClass,
        }),
      );
    } catch (error) {
      console.error('Error adding class:', error.message);
      res
        .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
        .json(APIResponse.internalServerError('Failed to add new class'));
    }
  }
}
