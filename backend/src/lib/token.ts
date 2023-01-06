import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET
const JWT_CONFIG = {
  secretKey: JWT_SECRET,
  options: {
    algorithm: "HS256",
    expiresIn: "1h",
    issuer: "issuer"
  }
}

export function generateToken(payload) {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_CONFIG.secretKey,
      JWT_CONFIG.options,
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
    jwt.verify(token, JWT_CONFIG.secretKey, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded)
    })
  })
}