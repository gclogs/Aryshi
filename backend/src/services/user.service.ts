import { pbkdf2Sync, randomBytes } from "crypto"
import User from "../schema/user";

export const passwordEncryption = (password: string) => {
  const salt = randomBytes(16).toString('base64');
  const result: Array<string> = [pbkdf2Sync(password, salt, 10000, 64, 'SHA512').toString('base64'), salt]
  return result;
}

export const userRegiseter = async (
  user_id: string,
  name: string,
  email: string,
  nickname: string,
  service_number: number,
  password: string,
  salt: string,
) => {
  const user = new User({
    user_id, name, email, nickname, service_number, password, salt
  });

  try {
    await user.save();
    return user;
  } catch (e) {
    return e;
  }
}