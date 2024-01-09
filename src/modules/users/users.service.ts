import { IUser } from "./users.interface";
import { User } from "./users.model";

const createUser = async (user: IUser): Promise<IUser | null> => {
  // console.log(user)

  const createUser = (await User.create(user)).toObject();
  //console.log(createUser, 'im to check from service is user created')
  return createUser;
};

export const UserService = {
  createUser,
};
