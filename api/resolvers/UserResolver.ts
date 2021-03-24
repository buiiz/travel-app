import { ObjectId } from 'mongodb';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';

import { User, UserModel } from '../entity/User';
import { isAuth } from '../middleware/isAuth';
import { ObjectIdScalar } from '../schema/object-id.scalar';
import { MyContext } from '../types/MyContext';
import { SettingsInput } from '../types/SettingsInput';

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Arg('userId', () => ObjectIdScalar) userId: ObjectId) {
    return await UserModel.findById(userId);
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async currentUser(
    @Ctx()
    ctx: MyContext,
  ): Promise<User | null> {
    return await UserModel.findById(ctx.res.locals.userId);
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async editUser(@Arg('input') settingsInput: SettingsInput, @Ctx() ctx: MyContext): Promise<User> {
    const { name, email, avatar } = settingsInput;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser && existingUser._id != ctx.res.locals.userId) {
      throw new Error('Email already in use');
    }

    const user = await UserModel.findOneAndUpdate(
      { _id: ctx.res.locals.userId },
      {
        name,
        email,
        avatar,
      },
      { runValidators: true, new: true },
    );

    if (!user) {
      throw new Error('Stream not found');
    }
    return user;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteUser(
    @Arg('userId', () => ObjectIdScalar) userId: ObjectId,
  ): Promise<boolean | undefined> {
    const deletedUser = await UserModel.findOneAndDelete({
      _id: userId,
    });

    if (!deletedUser) {
      throw new Error('User not found');
    }

    return true;
  }
}
