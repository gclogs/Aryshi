interface Error {
  [prop: string]: {
    statusCode: number,
    message: string
  }
}

const errors: Error = {
  UserExists: {
    statusCode: 409,
    message: 'User already exists',
  },
  Unknown: {
    statusCode: 500,
    message: 'Unauthorized',
  },
  BadRequest: {
    statusCode: 400,
    message: 'Bad Request'
  },
  WrongCredentials: {
    statusCode: 401,
    message: 'Invalid email or password'
  },
}

export default class AppError extends Error {
  public statusCode: number;

  constructor(public name: string, public payload?) {
    const info = errors[name]
    super(info.message);
    this.statusCode = info.statusCode;
  }
}

export function isAppError(error: any): error is AppError {
  return error instanceof AppError;
}