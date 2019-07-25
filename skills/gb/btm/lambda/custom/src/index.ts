import {
  AboutRequestHandler,
  AttractionRequestHandler,
  BreakfastRestaurantRequestHandler,
  ConsoleErrorHandler,
  DinnerRestaurantRequestHandler,
  FallbackRequestHandler,
  HelpRequestHandler,
  LaunchRequestHandler,
  LunchRestaurantRequestHandler,
  SessionEndedRequestHandler,
  StopRequestHandler
} from '@alexa-travel-guides/handlers';
import {
  IAttractionRepository,
  IRestaurantRepository,
  S3AttractionRepository,
  S3RestaurantRepository
} from '@alexa-travel-guides/repositories';
import {
  AttractionService,
  IAttractionService,
  IRestaurantService,
  RestaurantService
} from '@alexa-travel-guides/services';
import {SkillBuilders} from 'ask-sdk-core';
import {LambdaHandler} from 'ask-sdk-core/dist/skill/factory/BaseSkillFactory';
import * as AWS from 'aws-sdk';

const bucket: string = 'alexa-travel-guides';
const countryCode: string = 'gb';
const locationCode: string = 'btm';
const s3: AWS.S3 = new AWS.S3({region: 'eu-west-1'});

const attractionRepository: IAttractionRepository = new S3AttractionRepository(bucket, countryCode, locationCode, s3);
const restaurantRepository: IRestaurantRepository = new S3RestaurantRepository(bucket, countryCode, locationCode, s3);

const attractionService: IAttractionService = new AttractionService(attractionRepository);
const restaurantService: IRestaurantService = new RestaurantService(restaurantRepository);

const speechOutput: string = 'Bath is the largest city in the county of Somerset, England, ' +
  'known for its Roman-built baths. In 2011, the population was approximately 89,000. ' +
  'Bath is in the valley of the River Avon, 97 miles (156 km) west of London.' +
  'The city became a World Heritage site in 1987. (Wikipedia)';

export let handler: LambdaHandler = SkillBuilders // tslint:disable-line:export-name
  .custom()
  .addRequestHandlers(
    new AboutRequestHandler(speechOutput),
    new AttractionRequestHandler(attractionService),
    new BreakfastRestaurantRequestHandler(restaurantService),
    new DinnerRestaurantRequestHandler(restaurantService),
    new FallbackRequestHandler(),
    new HelpRequestHandler(),
    new LaunchRequestHandler(),
    new LunchRestaurantRequestHandler(restaurantService),
    new SessionEndedRequestHandler(),
    new StopRequestHandler()
  ).addErrorHandlers(
    new ConsoleErrorHandler()
  ).lambda();
