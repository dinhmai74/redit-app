import winston from 'winston'
import morgan, { StreamOptions } from 'morgan'

// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running ENV.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const level = () => {
  if (process.env.log_level) return process.env.log_level
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

winston.addColors(colors)

// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level} - [${info.label}] : ${info.message}`,
  ),
)

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  new winston.transports.File({ filename: 'logs/all.log' }),
]

// Create the logger instance that has to be exported
// and used to log messages.
export const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
  // Use the http severity
  write: (message) => logger.http(message),
}

const skip = (req: any) => {
  if (req?.body?.operationName === 'IntrospectionQuery') return true
  const env = process.env.NODE_ENV || 'development'
  return env !== 'development'
}
morgan.token('graphql-query', (req: any) => {
  const { variables, operationName } = req.body
  if (operationName === 'IntrospectionQuery') return ''
  return `\n--------------------------\nGRAPHQL: \nOperation Name: ${operationName} \nVariables: ${JSON.stringify(
    variables,
  )}\n--------------------------\n`
})

// Build the morgan middleware
export const morganMiddleware = morgan(':graphql-query', { stream, skip })
