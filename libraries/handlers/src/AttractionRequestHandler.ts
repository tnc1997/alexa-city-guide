import {Attraction} from '@alexa-travel-guides/entities';
import {SessionAttribute} from '@alexa-travel-guides/enums';
import {IAttractionService} from '@alexa-travel-guides/services';
import {HandlerInput, RequestHandler} from 'ask-sdk-core';
import {Request, Response} from 'ask-sdk-model';

export class AttractionRequestHandler implements RequestHandler {
  private attractionService: IAttractionService;

  constructor(attractionService: IAttractionService) {
    this.attractionService = attractionService;
  }

  public canHandle(input: HandlerInput): boolean {
    const request: Request = input.requestEnvelope.request;

    return request.type === 'IntentRequest' && request.intent.name === 'AttractionIntent';
  }

  public async handle(input: HandlerInput): Promise<Response> {
    const attractions: Attraction[] = await this.attractionService.get();
    const index: number = Math.floor(Math.random() * attractions.length);
    const attraction: Attraction = attractions[index];
    const sessionAttributes: {[key: string]: any} = input.attributesManager.getSessionAttributes(); // tslint:disable-line
    sessionAttributes[SessionAttribute.ATTRACTION] = attraction;

    const speechOutput: string =
      `Enjoy visiting ${attraction.name}.` +
      'I have sent additional details to your Alexa app.';

    const card: string =
      `Address: ${attraction.address}\n` +
      `Phone: ${attraction.phone}\n` +
      `Description: ${attraction.description}`;

    return input.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withSimpleCard(attraction.name, card)
      .getResponse();
  }
}
