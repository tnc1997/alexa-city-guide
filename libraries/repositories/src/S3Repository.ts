import {ISpecification} from '@alexa-travel-guides/specifications';
import {S3} from 'aws-sdk';

import {Repository} from './Repository';

export abstract class S3Repository<T> extends Repository<T> {
  private readonly getObjectRequest: S3.GetObjectRequest;
  private readonly s3: S3;

  public async get(): Promise<T[]>;
  public async get(specification: ISpecification<T>): Promise<T[]>;
  public async get(specification?: ISpecification<T>): Promise<T[]> {
    const entities: T[] = await this.downloadFile();

    return specification ? entities.filter(entity => specification.isSatisfiedBy(entity)) : entities;
  }

  protected constructor(getObjectRequest: S3.GetObjectRequest, s3: S3) {
    super();

    this.getObjectRequest = getObjectRequest;
    this.s3 = s3;
  }

  private async downloadFile(): Promise<T[]> {
    const {$response} = await this.s3.getObject(this.getObjectRequest).promise();

    if ($response.data && $response.data.Body) {
      return JSON.parse($response.data.Body.toString());
    } else if ($response.error) {
      throw new Error($response.error.toString());
    } else {
      throw new Error('An unknown error occurred whilst attempting to retrieve the data.');
    }
  }
}
