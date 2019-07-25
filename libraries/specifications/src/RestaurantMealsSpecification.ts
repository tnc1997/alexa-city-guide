import {Restaurant} from '@alexa-travel-guides/entities';
import {contains} from '@ts-utils/array';

import {Specification} from './Specification';

export class RestaurantMealsSpecification extends Specification<Restaurant> {
  constructor(meal: string) {
    super(entity => contains(entity.meals, meal));
  }
}
