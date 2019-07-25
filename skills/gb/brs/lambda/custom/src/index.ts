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
const locationCode: string = 'brs';
const s3: AWS.S3 = new AWS.S3({region: 'eu-west-1'});

const attractionRepository: IAttractionRepository = new S3AttractionRepository(bucket, countryCode, locationCode, s3);
const restaurantRepository: IRestaurantRepository = new S3RestaurantRepository(bucket, countryCode, locationCode, s3);

const attractionService: IAttractionService = new AttractionService(attractionRepository);
const restaurantService: IRestaurantService = new RestaurantService(restaurantRepository);

const speechOutput: string = 'Bristol is a city and county in South West England with a population of over 400,000. ' +
  'The wider district has the 10th-largest population in England. ' +
  'The urban area population is approximately the 8th-largest in the UK. ' +
  'The city borders North Somerset and South Gloucestershire, ' +
  'with the cities of Bath and Gloucester to the south-east and north-east respectively. (Wikipedia)';

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
