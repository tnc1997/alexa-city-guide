import {HandlerInput, RequestHandler} from 'ask-sdk-core';
import {Request, Response} from 'ask-sdk-model';

export class SessionEndedRequestHandler implements RequestHandler {
  public canHandle(input: HandlerInput): boolean {
    const request: Request = input.requestEnvelope.request;

    return request.type === 'SessionEndedRequest';
  }

  public handle(input: HandlerInput): Response {
    const message: string = JSON.stringify(input.requestEnvelope.request);

    console.log(message);

    return input.responseBuilder.getResponse();
  }
}
