import { getModelForClass, prop as Property } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Field, Float, ObjectType } from 'type-graphql';

import { Ref } from '../types/Ref';
import { Country } from './Country';
// import { User } from './User';

@ObjectType()
class DataLocalePlace {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  country: string;
}

@ObjectType()
class LocalePlace {
  @Field()
  en: DataLocalePlace;

  @Field()
  ru: DataLocalePlace;

  @Field()
  uk: DataLocalePlace;
}

@ObjectType()
class Rating {
  @Field({ nullable: true })
  userName: string;

  @Field({ nullable: true })
  userId: string;

  @Field({ nullable: true })
  rate: number;

  @Field({ nullable: true })
  comment: string;
}

@ObjectType()
export class Place {
  @Field()
  readonly _id: ObjectId;

  @Field(() => [String])
  @Property({ required: true })
  imagesUrl: string[];

  @Field(() => LocalePlace)
  @Property({ required: true })
  data: LocalePlace;

  @Field(() => [Rating])
  @Property({ required: true, nullable: true })
  rating: [Rating];

  @Field(() => Float, { nullable: true })
  averageRating(): number | null {
    const ratings = [...this.rating];
    if (!ratings.length) return null;

    const ratingsSum = ratings.reduce((a, b) => a + b.rate, 0);
    return Math.round(ratingsSum / ratings.length);
  }

  @Field(() => Country)
  @Property({ ref: Country, required: true })
  country: Ref<Country>;
}

export const PlaceModel = getModelForClass(Place);
