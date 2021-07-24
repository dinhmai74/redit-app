import { errorTypes, ErrorNamekey } from '../constants/ErrorCode'

export const getErrorCode = (errorName: ErrorNamekey) => {
  return errorTypes[errorName]
}
