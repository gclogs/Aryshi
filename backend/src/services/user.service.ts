import { pbkdf2Sync, randomBytes } from "crypto"
import User from "../schema/user";

export const passwordEncryption = (password: string) => {
  const salt = randomBytes(16).toString('base64');
  const result: Array<string> = [pbkdf2Sync(password, salt, 10000, 64, 'SHA512').toString('base64'), salt]
  return result;
}

export const userRegiseter = async (
  name: string,
  email: string,
  password: string,
  nickname: string,
  service_number: number,
  salt: string,
) => {
  const user = new User({
    name, email, password, nickname, service_number, salt
  });

  try {
    await user.save();
    return user;
  } catch (e) {
    return e;
  }
}