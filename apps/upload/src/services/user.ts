import {
  Parent,
  iParent,
  BaseUserService,
  tParent,
  User,
  iUser,
} from '@backend-monorepo/common';

export class UserService extends BaseUserService<iUser> {
  constructor() {
    super(User);
  }
}
