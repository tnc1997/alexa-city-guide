import {IRepository} from '@alexa-travel-guides/repositories';
import {ISpecification} from '@alexa-travel-guides/specifications';

import {IService} from './IService';

export abstract class Service<T> implements IService<T> {
  private repository: IRepository<T>;

  public async get(): Promise<T[]>;
  public async get(specification: ISpecification<T>): Promise<T[]>;
  public async get(specification?: ISpecification<T>): Promise<T[]> {
    return specification ? await this.repository.get(specification) : await this.repository.get();
  }

  protected constructor(repository: IRepository<T>) {
    this.repository = repository;
  }
}
