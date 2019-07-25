export class SpeechOutput {
  public static readonly error: string =
    'Sorry, I couldn\'t understand that request. ' +
    'Please try again.';

  public static readonly fallback: string =
    'The Travel Guide skill can\'t help you with that. ' +
    'It can help you learn about the location if you say tell me about this location. ' +
    'What can I help you with?';

  public static readonly help: string =
    'Say tell me about this location, to hear more about this location; or, ' +
    'say recommend me an attraction, to hear more about an attraction.';

  public static readonly stop: string =
    'Okay, see you next time!';

  public static readonly welcome: string =
    `Welcome to the Travel Guide! ${SpeechOutput.help}`;
}
