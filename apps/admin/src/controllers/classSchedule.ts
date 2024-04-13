import { Request, Response } from 'express';
import { APIResponse, BaseController } from '@backend-monorepo/common';
import { ClassScheduleService } from '../services/classSchedule';
import { classScheduleService } from '../store';

export class ClassScheduleController extends BaseController<ClassScheduleService> {
  constructor() {
    super(classScheduleService);
  }

  async addClassSchedule(req: Request, res: Response) {
    const { className, schedule } = req.body;
    try {
      const newClassSchedule = await classScheduleService.addClassSchedule(
        className,
        schedule
      );
      res.json(
        APIResponse.success(newClassSchedule, 'added new classSchedule')
      );
      console.log(newClassSchedule);
    } catch (error) {
      console.log('error:', error);
      res.status(500).json(APIResponse.internalServerError(error.message));
    }
  }
}
