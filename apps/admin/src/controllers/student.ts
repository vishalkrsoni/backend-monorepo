import { Request, Response } from 'express';
import { StudentService } from '../services/student';
import { studentService } from '../store';
import { APIResponse, BaseController } from '@backend-monorepo/common';

export class StudentController extends BaseController<StudentService> {
  constructor() {
    super(studentService);
  }
  async findStudentsByClass(req: Request, res: Response) {
    const className = req.body.className;
    try {
      const data = await this.service.findStudentsByClass(className);
      res.json(data);
    } catch (error) {
      res.status(500).json(APIResponse.internalServerError(error.message));
    }
  }

  async findStudentsByAgeRange(req: Request, res: Response) {
    const minAge = parseInt(req.body.minAge);
    const maxAge = parseInt(req.body.maxAge);
    try {
      const data = await this.service.findStudentsByAgeRange(minAge, maxAge);
      res.json(data);
    } catch (error) {
      res.status(500).json(APIResponse.internalServerError(error.message));
    }
  }

  async addParentByStudentId(req: Request, res: Response) {
    const studentId = req.params.id;

    const { parentId } = req.body;
    try {
      const updatedStudent = await this.service.addParentByStudentId(
        studentId,
        parentId,
      );
      res.json(
        APIResponse.success(
          updatedStudent,
          'parent added successfully to student',
        ),
      );
    } catch (error) {
      res.status(500).json(APIResponse.internalServerError(error.message));
    }
  }

  async findParentsByStudentId(req: Request, res: Response) {
    const { studentId } = req.body;
    try {
      const parents = await this.service.findParentsByStudentId(studentId);

      res.json(
        APIResponse.success(parents, 'parent data fetched successfully'),
      );
    } catch (error) {
      res.status(500).json(APIResponse.internalServerError(error.message));
    }
  }
}
