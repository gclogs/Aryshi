import jwt from 'jsonwebtoken';

export interface AccessTokenPayload {
  type: 'access_token',
  userId: string
  userName: string
  tokenId: string
}

export interface RefreshTokenPayload {
  type: 'refresh_token',
  tokenId: string,
  rotationCounter: number
}

export type TokenPayload = AccessTokenPayload | RefreshTokenPayload;

const tokenConfig = {
  secretKey: process.env.JWT_SECRET,
  options: {
    expiresIn: "1h",
  }
}

export function generateToken(payload: TokenPayload) {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      tokenConfig['secretKey'],
      tokenConfig['options'],
      (err, token) => {
        if (err || !token) {
          reject(err)
          return;
        }
        resolve(token)
      }
    )
  })
}

export function validateToken(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, tokenConfig['secretKey'], (err, decoded) => {
      if (err) reject(err);
      resolve(decoded)
    })
  })
}