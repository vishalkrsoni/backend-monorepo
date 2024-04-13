import { Request, Response } from 'express';
import { TeacherService } from '../services/teacher';
import { APIResponse, BaseController } from '@backend-monorepo/common';

export class TeacherController extends BaseController<TeacherService> {
  async findTeachersBySubject(req: Request, res: Response) {
    const subject = req.params.subject;
    try {
      const data = await this.service.findTeachersBySubject(subject);
      res.json(APIResponse.success(data, 'found teachers data by subject'));
    } catch (error) {
      res.status(500).json(APIResponse.internalServerError(error.message));
    }
  }
}
