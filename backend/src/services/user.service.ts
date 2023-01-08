import bcrypt from 'bcrypt'
import db from '../lib/db'
import AppErorr, { isAppErorr } from "../lib/error"
import { generateToken, validateToken } from '../lib/token'
import { User, Token } from '@prisma/client'
import { DateTime } from '../lib/date'

interface TokenParams {
  accessToken: string
  refreshToken: string
}

interface AuthParams {
  email: string
  name: string
  password: string
  createdAt: string
  birth: string
}

const SALT = 10;

const userService = {
  async createToken(userId: string) {
    const token = await db.token.create({
      data: {
        userId
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
    
    const tokens: TokenParams = await this.generateTokens(user);

    return {
      tokens,
      user
    };
  },
  
  unregister({ email }: AuthParams) {
    return db.user.delete({
      where: {
        email
      }
    })
  },

  async login({ email, password }: AuthParams) {
    const user = await db.user.findUnique({
      where: {
        email,
      }
    })

    if (!email) {
      throw new AppErorr("WrongCredentials");
    }
    
    try {
      const match = await bcrypt.compare(password, user.passwordHash)
      if (!match) {
        throw new AppErorr("WrongCredentials");
      }
    } catch(e) {
      if (isAppErorr(e)) {
        throw e
      }
      throw new AppErorr("Unknown")
    }

    const tokens: TokenParams = await this.generateTokens(user);
    return {
      tokens,
      user
    };
  },

  async refreshToken(token: string) {
    try {
      const { tokenId, rotationCounter }: any = await validateToken(token);
      const tokenItem = await db.token.findUnique({
        where: {
          id: tokenId,
        },
        include: {
          user: true
        }
      })
      
      if (!tokenItem) {
        throw new Error(`Token not found`);
      }
      if (tokenItem.blocked) {
        throw new Error(`Token is blocked`);
      }
      if (tokenItem.rotationCounter !== rotationCounter) {
        await db.token.update({
          where: {
            id: tokenId
          },
          data: {
            blocked: true
          }
        })
        throw new Error(`Rotaiton counter does not match`)
      }
      tokenItem.rotationCounter += 1;
      await db.token.update({
        where: {
          id: tokenId
        },
        data: {
          rotationCounter: tokenItem.rotationCounter
        }
      })
      return this.generateTokens(tokenItem.user, tokenItem)
    } catch (e) {
      throw new AppErorr("BadRequest")
    }
  }
}

export default userService;