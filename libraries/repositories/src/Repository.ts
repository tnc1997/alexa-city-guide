import {ISpecification} from '@alexa-travel-guides/specifications';

import {IRepository} from './IRepository';

export abstract class Repository<T> implements IRepository<T> {
  public abstract get(): Promise<T[]>;
  public abstract get(specification: ISpecification<T>): Promise<T[]>;
}
