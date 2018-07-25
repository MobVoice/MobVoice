require('dotenv').config()

// Server and database configs
const port = process.env.PORT || 3000
const appName = process.env.APP_NAME
const databaseDomain = process.env.DATABASE_DOMAIN
const databasePort = process.env.DATABASE_PORT
const databaseName = process.env.DATABASE_NAME
const databaseUsername = process.env.DATABASE_USERNAME
const databasePassword = process.env.DATABASE_PASSWORD
const sessionSecret = process.env.SESSION_SECRET
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = process.env.NODE_ENV === 'development'
const isTesting = !!global.it
// Auth configs
const facebookClientId = process.env.FACEBOOK_CLIENT_ID
const facebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET
const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

module.exports = {
  port,
  appName,
  databaseDomain,
  databasePort,
  databaseName,
  databaseUsername,
  databasePassword,
  sessionSecret,
  baseUrl,
  isProduction,
  isDevelopment,
  isTesting,
  facebookClientId,
  facebookClientSecret,
  googleClientId,
  googleClientSecret
}
