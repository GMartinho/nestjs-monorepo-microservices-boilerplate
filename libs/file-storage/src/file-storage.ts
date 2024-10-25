import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { FileStorageClient } from './file-storage-client.interface';
import { Environment } from '@libs/core/env/environment';

@Injectable()
export class FileStorageService {
  constructor(
    @Inject('FILE_STORAGE_CLIENT') private fileStorage: FileStorageClient,
    private readonly env: Environment,
  ) {}

  set fileStorageClient(fileStorage: FileStorageClient) {
    this.fileStorage = fileStorage;
  }

  async create(file, userId: string, bucketName: string, path?: string) {
    return;
  }

  async findMany(user_id: string, bucket: string, parent_id?: number) {
    return;
  }

  async findOne(key: string, bucket: string) {
    return;
  }

  async update(user_id: string, file, bucket: string, parent_id?: number) {
    return;
  }

  async remove(id: number) {
    return `This action removes a #${id} awsS3`;
  }
}
