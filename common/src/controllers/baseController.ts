import { Request, Response } from 'express';
import { Document, Model, FilterQuery } from 'mongoose';

import { APIResponse } from '../utils';
import { HttpStatusCode } from 'axios';
import { BaseServiceInterface } from '../services/baseService';

export interface BaseControllerInterface<T> {
  getAll(req: Request, res: Response): Promise<APIResponse | any | void | null>;
  getById(
    req: Request,
    res: Response,
  ): Promise<APIResponse | any | void | null>;
  getByAttribute(
    req: Request,
    res: Response,
  ): Promise<APIResponse | any | void | null>;
  updateById(
    req: Request,
    res: Response,
  ): Promise<APIResponse | any | void | null>;
  deleteById(
    req: Request,
    res: Response,
  ): Promise<APIResponse | any | void | null>;
}

export class BaseController<T extends BaseServiceInterface>
  implements BaseControllerInterface<T>
{
  constructor(public service: T) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.service.getAll();
      res.status(response.statusCode).json(response);
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
      res
        .status(HttpStatusCode.InternalServerError)
        .json(
          APIResponse.internalServerError(
            'Server error occurred while fetching data',
            error.message || error,
          ),
        );
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const response = await this.service.getById(id);
      res.status(response.statusCode).json(response);
    } catch (error) {
      console.error('Error occurred while fetching data by ID:', error);
      res
        .status(HttpStatusCode.InternalServerError)
        .json(
          APIResponse.internalServerError(
            'Server error occurred while fetching data by ID',
            error.message || error,
          ),
        );
    }
  }

  async getByAttribute(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.service.getByAttribute(req.body);
      res.status(response.statusCode).json(response);
    } catch (error) {
      console.error('Error occurred while fetching data by attribute:', error);
      res
        .status(HttpStatusCode.InternalServerError)
        .json(
          APIResponse.internalServerError(
            'Server error occurred while fetching data by attribute',
            error.message || error,
          ),
        );
    }
  }

  async updateById(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.service.updateById(req.body);
      res.status(response.statusCode).json(response);
    } catch (error) {
      console.error('Error occurred while updating data by ID:', error);
      res
        .status(HttpStatusCode.InternalServerError)
        .json(
          APIResponse.internalServerError(
            'Server error occurred while updating data by ID',
            error.message || error,
          ),
        );
    }
  }

  async deleteById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const response = await this.service.deleteById(id);
      res.status(response.statusCode).json(response);
    } catch (error) {
      console.error('Error occurred while deleting data by ID:', error);
      res
        .status(HttpStatusCode.InternalServerError)
        .json(
          APIResponse.internalServerError(
            'Server error occurred while deleting data by ID',
            error.message || error,
          ),
        );
    }
  }
}
