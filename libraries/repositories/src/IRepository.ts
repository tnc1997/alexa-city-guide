import {ISpecification} from '@alexa-travel-guides/specifications';

export interface IRepository<T> {
  get(): Promise<T[]>;
  get(specification: ISpecification<T>): Promise<T[]>;
}
