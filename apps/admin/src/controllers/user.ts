import { BaseController } from '@backend-monorepo/common';
import { UserService } from '../services/user';
import { Request, Response } from 'express';

export class UserController extends BaseController<UserService> {
  private userService: UserService;

  constructor(userService: UserService) {
    super(userService);
    this.userService = userService;
  }

  async getAll(req: Request, res: Response) {
    try {
      const data = await this.userService.getAll();
      res.json(data);
    } catch (error) {
      console.error('Error occurred while fetching users:', error);
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  }
}
