import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Arg, Mutation, Resolver } from 'type-graphql';

import { UserModel } from '../entity/User';
import { AuthInput } from '../types/AuthInput';
import { UserResponse } from '../types/UserResponse';

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('input')
    { name, email, password, avatar }: AuthInput,
  ): Promise<UserResponse> {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new Error('Email already in use');
    }

    const role = 'user';

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: hashedPassword, avatar, role });
    await user.save();

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.SESSION_SECRET || 'dxH4aLyK8r1zq6xf');

    return { user, token };
  }

  @Mutation(() => UserResponse)
  async login(@Arg('input') { email, password }: AuthInput): Promise<UserResponse> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error('Invalid login');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Invalid login');
    }

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.SESSION_SECRET || 'dxH4aLyK8r1zq6xf');

    return { user, token };
  }
}
