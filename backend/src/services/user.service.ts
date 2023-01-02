import bcrypt from 'bcrypt'
import db from '../lib/db'
import AppErorr from "../lib/error"
import { generateToken } from '../lib/token'
import { User, Token } from '@prisma/client'
import { DateTime } from '../lib/date'

interface AuthParams {
  email: string,
  name: string,
  password: string,
  createdAt: string
  birth: string
}

const SALT = 10;

const userService = {
  async createToken(userEmail: string) {
    const token = await db.token.create({
      data: {
        userEmail
      }
    })

    return token;
  },

  async generateTokens(user: User, userToken: Token) {
    const { email: userEmail, name: userName } = user;
    const token = userToken ?? (await this.createToken)
    const tokenId = token.id

    const [accessToken, refreshToken] = await Promise.all([
      generateToken({
        type: 'access_token',
        userEmail,
        tokenId,
        userName
      }),
      generateToken({
        type: 'refresh_token',
        tokenId,
        rotationCounter: token.rotationCounter
      })
    ])

    return {
      refreshToken,
      accessToken
    }
  },

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
        createdAt: DateTime("full", "short", "Asia/Seoul")
      }
    })
    
    const tokens = await this.generateTokens(user);

    return {
      tokens,
      user
    };
  },
  
  unregister(email: string) {
    return db.user.delete({
      where: {
        email
      }
    })
  },

  async update({email, name, password}) {
    const user = await db.user.findUnique({
      where: { email }
    })

    try {
      const match = await bcrypt.compare(password, user.passwordHash);
      if (!(match)) {
        throw new AppErorr("WrongCredentials");
      }
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }

    await db.user.update({
      where: {
        email
      },
      
      data: {
        name
      }
    })
    
    return true;
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

    const tokens = await this.generateTokens(user);
    return { tokens, user };
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