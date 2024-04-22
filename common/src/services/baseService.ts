import { Document, Model, FilterQuery } from 'mongoose';
import { APIResponse } from '../utils';

export interface BaseServiceInterface {
  getAll(): Promise<APIResponse>;
  getById(id: string): Promise<APIResponse>;
  getByAttribute(body: any): Promise<APIResponse>;
  updateById(body: any): Promise<APIResponse>;
  deleteById(id: string): Promise<APIResponse>;
}

export class BaseUserService<T extends Document>
  implements BaseServiceInterface
{
  constructor(public model: Model<T>) {}

  async getAll(): Promise<APIResponse> {
    try {
      const response = await this.model.find().exec();
      return APIResponse.success('Success fetching data', response);
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
      return APIResponse.internalServerError(
        'Internal Server Error Occurred. Try later',
        error.message || error,
      );
    }
  }

  async getById(id: string): Promise<APIResponse> {
    try {
      if (!id) {
        return APIResponse.badRequest('ID must be provided');
      }
      const data = await this.model.findById(id).exec();
      if (!data) {
        return APIResponse.notFound(`Data not found for ID: ${id}`);
      }
      return APIResponse.success(`Success fetching data for ID: ${id}`, data);
    } catch (error) {
      console.error('Error occurred while fetching data by ID:', error);
      return APIResponse.internalServerError(
        'Internal Server Error Occurred. Try later',
        error.message || error,
      );
    }
  }

  async getByAttribute(body: any): Promise<APIResponse> {
    try {
      const { attribute, value } = body;
      if (!attribute || !value) {
        return APIResponse.badRequest('Attribute and value must be provided');
      }
      const filter = { [attribute]: value } as FilterQuery<T>;
      const data = await this.model.findOne(filter).exec();
      return APIResponse.success(
        `Success fetching data for ${attribute}: ${value}`,
        data,
      );
    } catch (error) {
      console.error('Error occurred while fetching data by attribute:', error);
      return APIResponse.internalServerError(
        'Internal Server Error Occurred. Try later',
        error.message || error,
      );
    }
  }

  async updateById(body: any): Promise<APIResponse> {
    try {
      const { id, data } = body;
      if (!id) {
        return APIResponse.badRequest('ID must be provided');
      }

      if (!data) {
        return APIResponse.badRequest('Data must be provided');
      }

      const updatedDocument = await this.model
        .findByIdAndUpdate(id, data, { new: true })
        .exec();

      if (!updatedDocument) {
        return APIResponse.notFound(`Data not found for ID: ${id}`);
      }

      return APIResponse.success(
        `Success updating data for ID: ${id}`,
        updatedDocument,
      );
    } catch (error) {
      console.error(`Error occurred while updating data`, error);
      return APIResponse.internalServerError(
        `Failed to update document ${error.message || error}`,
        error,
      );
    }
  }

  async deleteById(id: string): Promise<APIResponse> {
    try {
      if (!id) {
        return APIResponse.badRequest('ID must be provided');
      }
      const deletedDocument = await this.model.findByIdAndDelete(id).exec();
      if (!deletedDocument) {
        return APIResponse.notFound(`Data not found for ID: ${id}`);
      }
      return APIResponse.success(`Success deleting data for ID: ${id}`, null);
    } catch (error) {
      console.error(`Error occurred while deleting data for ID: ${id}:`, error);
      return APIResponse.internalServerError(
        `Failed to delete document with ID ${id}: ${error.message || error}`,
        error,
      );
    }
  }
}
