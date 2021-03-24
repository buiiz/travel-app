import {
  getModelForClass,
  prop as Property,
  setGlobalOptions,
  Severity,
} from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';

setGlobalOptions({ options: { allowMixed: Severity.ALLOW } });

@ObjectType()
class DataLocaleCountry {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  capital: string;
}

@ObjectType()
class LocaleCountry {
  @Field()
  en: DataLocaleCountry;

  @Field()
  ru: DataLocaleCountry;

  @Field()
  uk: DataLocaleCountry;
}

@ObjectType()
export class Country {
  @Field()
  readonly _id: ObjectId;

  @Field(() => [String])
  @Property({ required: true })
  imagesUrl: string[];

  @Field()
  @Property({ required: true })
  videoUrl: string;

  @Field()
  @Property({ required: true })
  currency: string;

  @Field()
  @Property({ required: true })
  timeZone: string;

  @Field(() => [Number])
  @Property({ required: true })
  coordinates: number[];

  @Field()
  @Property({ required: true, uppercase: true, unique: true })
  ISOCode?: string;

  @Field(() => LocaleCountry)
  @Property()
  data: LocaleCountry;
}

export const CountryModel = getModelForClass(Country);
