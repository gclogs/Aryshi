import { pbkdf2Sync, randomBytes } from "crypto"
import db from '../lib/db'
import User from "../schema/user";

interface AuthParams {
  email: string,
  name: string,
  password: string,
  salt: string,
  createdAt: string
  birth: string
}

const hashedPassword = async (password: string) => {
  const salt = await randomBytes(16).toString('base64');
  try {
    const result: Array<string> = [pbkdf2Sync(password, salt, 9999, 64, 'SHA512').toString('base64'), salt]
    return result;
  } catch (e) {
    console.log(e);
  }
}

const koDtf = new Intl.DateTimeFormat("ko", { dateStyle: "long" });

const userService = {
  async register({email, password, name, birth, salt}: AuthParams) {
    const exists = await db.user.findUnique({
      where: {
        email
      }
    })

    if (exists) {
      throw new Error('Aleady Email')
    }

    const hash: any = await hashedPassword(password);
    const user = await db.user.create({
      data: {
        email,
        name,
        birth: new Date(),
        password: hash[0],
        createdAt: new Date()
      }
    })

    return user;
  }
}

export default userService;