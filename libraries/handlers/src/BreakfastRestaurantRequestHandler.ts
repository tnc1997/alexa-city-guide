import {RestaurantMealsSpecification} from '@alexa-travel-guides/specifications';
import {IRestaurantService} from '@alexa-travel-guides/services';
import {HandlerInput} from 'ask-sdk-core';
import {Request} from 'ask-sdk-model';

import {RestaurantRequestHandler} from './RestaurantRequestHandler';

export class BreakfastRestaurantRequestHandler extends RestaurantRequestHandler {
  constructor(restaurantService: IRestaurantService) {
    super(restaurantService, new RestaurantMealsSpecification('Breakfast'));
  }

  public canHandle(input: HandlerInput): boolean {
    const request: Request = input.requestEnvelope.request;

    return request.type === 'IntentRequest' && request.intent.name === 'BreakfastIntent';
  }
}
