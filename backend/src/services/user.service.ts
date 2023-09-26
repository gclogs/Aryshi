import bcrypt from 'bcrypt'
import db from '../lib/db'
import AppError, { isAppError } from "../lib/error"
import { generateToken, validateToken } from '../lib/token'
import { User, Token } from '@prisma/client'
import date from '../lib/date'

interface TokenParams {
  accessToken: string
  refreshToken: string
}

interface AuthParams {
  email: string
  password: string
  serial: string
  username: string
  nickname: string
  birth?: string
  createdAt?: string
}

const SALT = 10;

const userService = {
  async createToken(userId, serial, email) {
    const token = await db.token.create({
      data: {
        userId,
        serial,
        email
      }
    })

    return token;
  },

  async generateTokens(user: User, tokenItem: Token) {
    const { id: userId, serial, email } = user;
    const token = tokenItem ?? (await this.createToken(userId, serial, email))
    const tokenId = token.id

    const [accessToken, refreshToken] = await Promise.all([
      generateToken({
        type: 'access_token',
        userId,
        tokenId,
        email,
        serial
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

  async register(
    {email, password, serial, username, nickname, birth}
    : AuthParams) {
    const exists = await db.user.findUnique({
      where: {
        email
      }
    })

    if (exists) {
      throw new AppError('UserExists')
    }

    const hash = await bcrypt.hash(password, SALT);
    const user = await db.user.create({
      data: {
        email,
        serial,
        username,
        nickname,
        birth: new Date(),
        passwordHash: hash,
        createdAt: date.now("full", "short", "Asia/Seoul")
      }
    })
    
    const tokens: TokenParams = await this.generateTokens(user);

    return {
      tokens,
      user
    };
  },
  
  async unregister({ email }: AuthParams) {
    await db.token.delete( {where: { email }} );
    return await db.user.delete({
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
      throw new AppError("WrongCredentials");
    }
    
    try {
      if(!user?.passwordHash) return null;
      const match = await bcrypt.compare(password, user.passwordHash)
      if (!match) {
        throw new AppError("WrongCredentials");
      }
    } catch(e) {
      if (isAppError(e)) {
        throw e
      }
      throw new AppError("Unknown")
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
      console.log(tokenId, rotationCounter)
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
      console.log(e)
      throw new AppError("BadRequest")
    }
  }
}

export default userService;