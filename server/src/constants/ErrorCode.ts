export const errorNames = {
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  SERVER_ERROR: 'SERVER_ERROR',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
}

export type ErrorNamekey = keyof typeof errorNames

type ErrorType = {
  [Name in ErrorNamekey]: {
    message: string
    statusCode: number
    logMessage?: string
  }
}

export const errorTypes: ErrorType = {
  USER_ALREADY_EXISTS: {
    statusCode: 403,
    message: 'User is already exists.',
  },
  SERVER_ERROR: {
    message: 'Server error.',
    statusCode: 500,
  },
  INVALID_PASSWORD: {
    message: 'Password is not correct',
    statusCode: 401,
  },
  USER_NOT_FOUND: {
    message: 'User and password are miss match',
    logMessage: 'User not found',
    statusCode: 401,
  },
}
