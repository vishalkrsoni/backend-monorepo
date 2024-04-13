import { Model, Document, FilterQuery } from 'mongoose';

export interface BaseServiceInterface<T extends Document> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  getByAttribute(attribute: string, value: any): Promise<T | null>;
  updateById(id: string, data: Partial<T>): Promise<T | null>;
  deleteById(id: string): Promise<void>;
}

export class BaseUserService<T extends Document>
  implements BaseServiceInterface<T>
{
  constructor(public model: Model<T>) {
    this.model = model;
  }

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
        `Failed to retrieve document with ID ${id}: ${error.message}`
      );
    }
  }

  async getByAttribute(attribute: string, value: any): Promise<T | null> {
    try {
      const filter = { [attribute]: value } as FilterQuery<T>;
      const document = await this.model.findOne(filter).exec();
      return document;
    } catch (error) {
      throw new Error(
        `Failed to retrieve document by attribute: ${error.message}`
      );
    }
  }

  async updateById(id: string, data: Partial<T>): Promise<T | null> {
    try {
      const updatedDocument = await this.model
        .findByIdAndUpdate(id, data, { new: true })
        .exec();
      return updatedDocument;
    } catch (error) {
      throw new Error(
        `Failed to update document with ID ${id}: ${error.message}`
      );
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.model.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error(
        `Failed to delete document with ID ${id}: ${error.message}`
      );
    }
  }
}
