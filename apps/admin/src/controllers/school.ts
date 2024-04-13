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
      const newSchool = await schoolService.addSchool(schoolName, address);
      res.json(APIResponse.success(newSchool, 'added new School'));
      console.log(newSchool);
    } catch (error) {
      console.log('error:', error);
      res.status(500).json(APIResponse.internalServerError(error.message));
    }
  }
}
