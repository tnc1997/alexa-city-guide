import {Attraction} from '@alexa-travel-guides/entities';

import {Specification} from './Specification';

export class AttractionNameSpecification extends Specification<Attraction> {
  constructor(name: string) {
    super(entity => entity.name === name);
  }
}
