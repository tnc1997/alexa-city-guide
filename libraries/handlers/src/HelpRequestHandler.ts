import {HandlerInput, RequestHandler} from 'ask-sdk-core';
import {Request, Response} from 'ask-sdk-model';

import {SpeechOutput} from './SpeechOutput';

export class HelpRequestHandler implements RequestHandler {
  public canHandle(input: HandlerInput): boolean {
    const request: Request = input.requestEnvelope.request;

    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
  }

  public handle(input: HandlerInput): Response {
    return input.responseBuilder
      .speak(SpeechOutput.help)
      .reprompt(SpeechOutput.help)
      .getResponse();
  }
}
