import { getModelForClass, prop as Property } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  name?: string;

  @Field()
  @Property({ required: true })
  email: string;

  @Field()
  @Property({ required: true })
  password: string;

  @Field()
  @Property({ required: true })
  avatar?: string;

  @Field()
  @Property()
  role?: string;
}

export const UserModel = getModelForClass(User);
