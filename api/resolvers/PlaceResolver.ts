import { ObjectId } from 'mongodb';
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';

import { Country, CountryModel } from '../entity/Country';
import { Place, PlaceModel } from '../entity/Place';
import { isAuth } from '../middleware/isAuth';
import { ObjectIdScalar } from '../schema/object-id.scalar';
import { MyContext } from '../types/MyContext';
import { RatingInput } from '../types/RatingInput';

@Resolver(() => Place)
export class PlaceResolver {
  @Query(() => Place, { nullable: true })
  @UseMiddleware(isAuth)
  place(@Arg('placeId', () => ObjectIdScalar) placeId: ObjectId) {
    return PlaceModel.findById(placeId);
  }

  @Query(() => [Place])
  places(@Arg('countryId', () => ObjectIdScalar) countryId: ObjectId) {
    return PlaceModel.find({ country: countryId });
  }

  @Mutation(() => Place)
  @UseMiddleware(isAuth)
  async editPlace(@Arg('input') ratingInput: RatingInput, @Ctx() ctx: MyContext): Promise<Place> {
    const { id, userName, rate, comment } = ratingInput;
    const place = await PlaceModel.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          rating: {
            userId: ctx.res.locals.userId,
            userName,
            rate,
            comment,
          },
        },
      },
      { runValidators: true, new: true },
    );

    if (!place) {
      throw new Error('Stream not found');
    }
    return place;
  }

  @FieldResolver()
  async country(@Root() place: Place): Promise<Country | null> {
    return await CountryModel.findById(place.country);
  }
}
