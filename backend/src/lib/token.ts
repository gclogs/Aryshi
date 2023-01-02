import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET

export function generateToken(payload) {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: '1h'
      },
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
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded)
    })
  })
}