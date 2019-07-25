import {HandlerInput, RequestHandler} from 'ask-sdk-core';
import {Request, Response} from 'ask-sdk-model';

import {SpeechOutput} from './SpeechOutput';

export class LaunchRequestHandler implements RequestHandler {
  public canHandle(input: HandlerInput): boolean {
    const request: Request = input.requestEnvelope.request;

    return request.type === 'LaunchRequest';
  }

  public handle(input: HandlerInput): Response {
    return input.responseBuilder
      .speak(SpeechOutput.welcome)
      .reprompt(SpeechOutput.welcome)
      .getResponse();
  }
}
