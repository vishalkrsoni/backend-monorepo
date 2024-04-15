import { Model, Document, FilterQuery } from 'mongoose';

export interface BaseServiceInterface<T extends Document> {
  getAll(): Promise<T[] | any>;
  getById(id: string): Promise<T | null | any>;
  getByAttribute(attribute: string, value: any): Promise<T | null | any>;
  updateById(id: string, data: Partial<T>): Promise<T | null | any>;
  deleteById(id: string): Promise<void | any>;
}

export class BaseUserService<T extends Document>
  implements BaseServiceInterface<T>
{
  constructor(public model: Model<T>) {}

  async getAll(): Promise<T[]> {
    try {
      const documents = await this.model.find().exec();
      return documents;
    } catch (error) {
      throw new Error(`Failed to retrieve all documents: ${error.message}`);
    }
  }

  async getById(id: string): Promise<T | null> {
    try {
      const document = await this.model.findById(id).exec();
      return document;
    } catch (error) {
      throw new Error(
        `Failed to retrieve document with ID ${id}: ${error.message}`,
      );
    }
  }

  async getByAttribute(attribute: string, value: any): Promise<T | null> {
    try {
      if (!attribute || !value) {
        throw new Error('Attribute and value must be provided');
      }
      const filter = { [attribute]: value } as FilterQuery<T>;
      const document = await this.model.findOne(filter).exec();
      return document;
    } catch (error) {
      throw new Error(
        `Failed to retrieve document by attribute: ${error.message}`,
      );
    }
  }

  async updateById(id: string, data: Partial<T>): Promise<T | null> {
    try {
      if (!id || !data) {
        throw new Error('ID and data must be provided');
      }
      const updatedDocument = await this.model
        .findByIdAndUpdate(id, data, { new: true })
        .exec();
      return updatedDocument;
    } catch (error) {
      throw new Error(
        `Failed to update document with ID ${id}: ${error.message}`,
      );
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      if (!id) {
        throw new Error('ID must be provided');
      }
      await this.model.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error(
        `Failed to delete document with ID ${id}: ${error.message}`,
      );
    }
  }
}
