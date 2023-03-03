import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> &
  Required<Pick<T, TRequired>>;

@InputType()
export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'nickname',
]) {
  @Field(type => String, { nullable: true })
  photoUrl?: string;
}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
