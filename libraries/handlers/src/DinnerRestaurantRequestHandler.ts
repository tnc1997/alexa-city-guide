import {IRestaurantService} from '@alexa-travel-guides/services';
import {RestaurantMealsSpecification} from '@alexa-travel-guides/specifications';
import {HandlerInput} from 'ask-sdk-core';
import {Request} from 'ask-sdk-model';

import {RestaurantRequestHandler} from './RestaurantRequestHandler';

export class DinnerRestaurantRequestHandler extends RestaurantRequestHandler {
  constructor(restaurantService: IRestaurantService) {
    super(restaurantService, new RestaurantMealsSpecification('Dinner'));
  }

  public canHandle(input: HandlerInput): Promise<boolean> | boolean {
    const request: Request = input.requestEnvelope.request;

    return request.type === 'IntentRequest' && request.intent.name === 'DinnerIntent';
  }
}
