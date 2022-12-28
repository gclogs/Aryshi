import bcrypt from 'bcrypt'
import db from '../lib/db'
import AppErorr from "../lib/error"

const SALT = 10;

interface AuthParams {
  email: string,
  name: string,
  password: string,
  createdAt: string
  birth: string
}

const koDtf = new Intl.DateTimeFormat("ko", { dateStyle: "full", timeStyle: "short" });

const userService = {
  async register({email, password, name, birth}: AuthParams) {
    const exists = await db.user.findUnique({
      where: {
        email
      }
    })

    if (exists) {
      throw new AppErorr('UserExists')
    }

    const hash = await bcrypt.hash(password, SALT);
    const user = await db.user.create({
      data: {
        email,
        name,
        birth: new Date(),
        passwordHash: hash,
        createdAt: koDtf.format(new Date()),
      }
    })

    return user;
  },
  
  unregister(email: string) {
    return db.user.delete({
      where: {
        email
      }
    })
  },

  async update({email, name}) {
    const user = await db.user.update({
      where: { email },
      data: {
        name
      }
    })

    return user;
  },

  async login({ email, password }: AuthParams) {
    const user = await db.user.findUnique({
      where: {
        email,
      }
    })
    
    if (!email) {
      throw new AppErorr("WrongCredentials")
    }
    
    try {
      const match = await bcrypt.compare(password, user.passwordHash)
      if (!match) {
        throw new AppErorr("WrongCredentials");
      }
    } catch(e) {
      console.log(e);
      throw new AppErorr("WrongCredentials")
    }

    return user;
  },
  
  async findEmail(userEmail) {
    const user = await db.user.findUnique({
      where: {
        email: userEmail
      }
    })
    return user;
  }
}

export default userService;