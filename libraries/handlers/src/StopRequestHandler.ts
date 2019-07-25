import {HandlerInput, RequestHandler} from 'ask-sdk-core';
import {Request, Response} from 'ask-sdk-model';

import {SpeechOutput} from './SpeechOutput';

export class StopRequestHandler implements RequestHandler {
  public canHandle(input: HandlerInput): boolean {
    const request: Request = input.requestEnvelope.request;

    return request.type === 'IntentRequest' && (
      request.intent.name === 'AMAZON.StopIntent' || request.intent.name === 'AMAZON.CancelIntent'
    );
  }

  public handle(input: HandlerInput): Response {
    return input.responseBuilder
      .speak(SpeechOutput.stop)
      .reprompt(SpeechOutput.stop)
      .getResponse();
  }
}
