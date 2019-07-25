import {ISpecification} from '@alexa-travel-guides/specifications';

export interface IService<T> {
  get(): Promise<T[]>;
  get(specification: ISpecification<T>): Promise<T[]>;
}
