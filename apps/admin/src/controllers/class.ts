import { Request, Response } from 'express';
import { classService } from '../store';
import { ClassService } from '../services/class';
import { APIResponse, BaseController } from '@backend-monorepo/common';

export class ClassController extends BaseController<ClassService> {
  constructor() {
    super(classService);
  }

  async addClass(req: Request, res: Response) {
    try {
      const newClass = await classService.addClass(req.body);
      res.json(APIResponse.success(newClass, 'Added new class successfully'));
    } catch (error) {
      console.error('Error adding class:', error.message);
      res
        .status(500)
        .json(APIResponse.internalServerError('Failed to add new class'));
    }
  }
}
