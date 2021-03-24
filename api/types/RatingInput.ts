import { ObjectId } from 'mongodb';
import { Field, InputType } from 'type-graphql';

@InputType()
export class RatingInput {
  @Field({ nullable: true })
  id?: ObjectId;

  @Field({ nullable: true })
  userName: string;

  @Field()
  rate: number;

  @Field({ nullable: true })
  comment: string;
}
