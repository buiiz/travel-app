import { ObjectId } from 'mongodb';
import { Arg, Query, Resolver } from 'type-graphql';

import { Country, CountryModel } from '../entity/Country';
import { ObjectIdScalar } from '../schema/object-id.scalar';

@Resolver(() => Country)
export class CountryResolver {
  @Query(() => Country, { nullable: true })
  country(@Arg('countryId', () => ObjectIdScalar) countryId: ObjectId) {
    return CountryModel.findById(countryId);
  }

  @Query(() => [Country])
  countries() {
    return CountryModel.find();
  }
}
