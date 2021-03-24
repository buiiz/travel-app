import { Field, InputType } from 'type-graphql';

@InputType()
export class SettingsInput {
  @Field({ nullable: true })
  name?: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  avatar?: string;
}
