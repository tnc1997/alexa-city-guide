import {IRestaurantService} from '@alexa-travel-guides/services';
import {RestaurantMealsSpecification} from '@alexa-travel-guides/specifications';
import {HandlerInput} from 'ask-sdk-core';
import {Request} from 'ask-sdk-model';

import {RestaurantRequestHandler} from './RestaurantRequestHandler';

export class LunchRestaurantRequestHandler extends RestaurantRequestHandler {
  constructor(restaurantService: IRestaurantService) {
    super(restaurantService, new RestaurantMealsSpecification('Lunch'));
  }

  public canHandle(input: HandlerInput): boolean {
    const request: Request = input.requestEnvelope.request;

    return request.type === 'IntentRequest' && request.intent.name === 'LunchIntent';
  }
}
