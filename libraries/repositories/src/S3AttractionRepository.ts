import {Attraction} from '@alexa-travel-guides/entities';
import {S3} from 'aws-sdk';

import {IAttractionRepository} from './IAttractionRepository';
import {S3Repository} from './S3Repository';

export class S3AttractionRepository extends S3Repository<Attraction> implements IAttractionRepository {
  constructor(bucket: string, countryCode: string, locationCode: string, s3: S3) {
    const getObjectRequest: S3.GetObjectRequest = {
      Bucket: bucket,
      Key: `data/${countryCode}/${locationCode}/attractions.json`
    };

    super(getObjectRequest, s3);
  }
}
