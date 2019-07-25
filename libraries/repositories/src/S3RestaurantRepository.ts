import {Restaurant} from '@alexa-travel-guides/entities';
import {S3} from 'aws-sdk';

import {IRestaurantRepository} from './IRestaurantRepository';
import {S3Repository} from './S3Repository';

export class S3RestaurantRepository extends S3Repository<Restaurant> implements IRestaurantRepository {
  constructor(bucket: string, countryCode: string, locationCode: string, s3: S3) {
    const getObjectRequest: S3.GetObjectRequest = {
      Bucket: bucket,
      Key: `data/${countryCode}/${locationCode}/restaurants.json`
    };

    super(getObjectRequest, s3);
  }
}
