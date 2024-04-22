import { Request, Response } from 'express';
import { schoolService } from '../store';
import { APIResponse, BaseController } from '@backend-monorepo/common';
import { SchoolService } from '../services/school';

export class SchoolController extends BaseController<SchoolService> {
  constructor() {
    super(schoolService);
  }

  async addSchool(req: Request, res: Response) {
    const { schoolName, address } = req.body;
    try {
      const response = await schoolService.addSchool(schoolName, address);
      res.status(response.statusCode).json(response);
      console.log(response);
    } catch (error) {
      console.log('error:', error);
      res.status(error.statusCode).json(error);
    }
  }
}
