import {Attraction} from '@alexa-travel-guides/entities';
import {IAttractionRepository} from '@alexa-travel-guides/repositories';

import {IAttractionService} from './IAttractionService';
import {Service} from './Service';

export class AttractionService extends Service<Attraction> implements IAttractionService {
  constructor(attractionRepository: IAttractionRepository) {
    super(attractionRepository);
  }
}
