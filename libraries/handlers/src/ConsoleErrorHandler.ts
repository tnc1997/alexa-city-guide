import {ErrorHandler, HandlerInput} from 'ask-sdk-core';
import {Response} from 'ask-sdk-model';

import {SpeechOutput} from './SpeechOutput';

export class ConsoleErrorHandler implements ErrorHandler {
  public canHandle(handlerInput: HandlerInput, error: Error): boolean {
    return true;
  }

  public handle(input: HandlerInput, error: Error): Response {
    const message: string = JSON.stringify({
      error: error,
      request: input.requestEnvelope.request
    });

    console.error(message);

    return input.responseBuilder
      .speak(SpeechOutput.error)
      .reprompt(SpeechOutput.error)
      .getResponse();
  }
}
