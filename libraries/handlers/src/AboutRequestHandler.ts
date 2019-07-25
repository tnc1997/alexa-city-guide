import {HandlerInput, RequestHandler} from 'ask-sdk-core';
import {Request, Response} from 'ask-sdk-model';

export class AboutRequestHandler implements RequestHandler {
  private readonly speechOutput: string;

  constructor(speechOutput: string) {
    this.speechOutput = speechOutput;
  }

  public canHandle(input: HandlerInput): boolean {
    const request: Request = input.requestEnvelope.request;

    return request.type === 'IntentRequest' && request.intent.name === 'AboutIntent';
  }

  public handle(input: HandlerInput): Response {
    return input.responseBuilder
      .speak(this.speechOutput)
      .reprompt(this.speechOutput)
      .getResponse();
  }
}
