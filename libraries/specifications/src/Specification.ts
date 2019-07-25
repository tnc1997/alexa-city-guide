import {ISpecification} from './ISpecification';

export abstract class Specification<T> implements ISpecification<T> {
  protected predicate: (entity: T) => boolean;

  public isSatisfiedBy(entity: T): boolean {
    return this.predicate(entity);
  }

  protected constructor(predicate: (entity: T) => boolean) {
    this.predicate = predicate;
  }
}
