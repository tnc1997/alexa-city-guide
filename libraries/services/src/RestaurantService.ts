import {Restaurant} from '@alexa-travel-guides/entities';
import {IRestaurantRepository} from '@alexa-travel-guides/repositories';

import {IRestaurantService} from './IRestaurantService';
import {Service} from './Service';

export class RestaurantService extends Service<Restaurant> implements IRestaurantService {
  constructor(restaurantRepository: IRestaurantRepository) {
    super(restaurantRepository);
  }
}
