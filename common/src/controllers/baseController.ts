import { APIResponse } from '@backend-monorepo/common';
import { Request, Response } from 'express';

interface BaseServiceInterface {
  getAll(): Promise<any>;
  getById(id: string): Promise<any>;
  getByAttribute(attribute: string, value: any): Promise<any>;
  updateById(id: string, data: any): Promise<any>;
  deleteById(id: string): Promise<void>;
}

export class BaseController<T extends BaseServiceInterface> {
  constructor(public service: T) {}

  async getAll(req: Request, res: Response) {
    try {
      const data = await this.service.getAll();
      res.json(APIResponse.success(data, 'found all requested users info'));
    } catch (error) {
      res.status(500).json(APIResponse.internalServerError(error.message));
    }
  }

  async getById(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const data = await this.service.getById(id);
      if (data) {
        res.json(APIResponse.success(data, 'data found by id successfully'));
      } else {
        res
          .status(404)
          .json(
            APIResponse.notFound('could not found any entry with requested id')
          );
      }
    } catch (error) {
      res.status(500).json(APIResponse.internalServerError(error.message));
    }
  }

  async getByAttribute(req: Request, res: Response) {
    const { attribute, value } = req.body;
    try {
      const data = await this.service.getByAttribute(attribute, value);
      if (data) {
        res.json(APIResponse.success(data));
      } else {
        res.status(404).json(APIResponse.notFound());
      }
    } catch (error) {
      res.status(500).json(APIResponse.internalServerError(error.message));
    }
  }

  async updateById(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const data = await this.service.updateById(id, req.body);
      res.json(APIResponse.success(data, 'updated successfully'));
    } catch (error) {
      res.status(500).json(APIResponse.internalServerError(error.message));
    }
  }

  async deleteById(req: Request, res: Response) {
    const id = req.params.id;
    try {
      await this.service.deleteById(id);
      res.json(APIResponse.success({ message: 'Deleted successfully' }));
    } catch (error) {
      res.status(500).json(APIResponse.internalServerError(error.message));
    }
  }
}
