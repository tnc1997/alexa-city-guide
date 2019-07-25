import {Restaurant} from '@alexa-travel-guides/entities';
import {SessionAttribute} from '@alexa-travel-guides/enums';
import {IRestaurantService} from '@alexa-travel-guides/services';
import {ISpecification} from '@alexa-travel-guides/specifications';
import {HandlerInput, RequestHandler} from 'ask-sdk-core';
import {Response} from 'ask-sdk-model';

export abstract class RestaurantRequestHandler implements RequestHandler {
  private readonly restaurantService: IRestaurantService;
  private readonly specification: ISpecification<Restaurant>;

  public abstract canHandle(input: HandlerInput): Promise<boolean> | boolean;

  public async handle(input: HandlerInput): Promise<Response> {
    const restaurants: Restaurant[] = await this.restaurantService.get(this.specification);
    const index: number = Math.floor(Math.random() * restaurants.length);
    const restaurant: Restaurant = restaurants[index];
    const sessionAttributes: {[key: string]: any} = input.attributesManager.getSessionAttributes(); // tslint:disable-line
    sessionAttributes[SessionAttribute.RESTAURANT] = restaurant;

    const speechOutput: string =
      `Enjoy visiting ${restaurant.name}. ` +
      'I have sent additional details to your Alexa app.';

    const cardContent: string =
      `Address: ${restaurant.address}\n` +
      `Phone: ${restaurant.phone}\n` +
      `Meals: ${restaurant.meals.join(', ')}`;

    return input.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withSimpleCard(restaurant.name, cardContent)
      .getResponse();
  }

  protected constructor(restaurantService: IRestaurantService, specification: ISpecification<Restaurant>) {
    this.restaurantService = restaurantService;
    this.specification = specification;
  }
}
