'use strict'

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const {resolve} = require('path')
const passport = require('passport')
const PrettyError = require('pretty-error')
const finalHandler = require('finalhandler')
const morgan = require('morgan')
const helmet = require('helmet')

/**/
const db = require('../db')
const Protest = db.model('protests')
const User = db.model('users')
const Votes = db.model('votes')
const Sequelize = require('sequelize')
/**/

const {port, appName, isProduction, sessionSecret} = require('../config')
// PrettyError docs: https://www.npmjs.com/package/pretty-error

const fs = require('fs')
fs.writeFileSync('gac.json', process.env.GAC_JSON_TOKEN)

const app = express()
const server = require('http').Server(app)

// begin tts
const io = require('socket.io')(server)
const tts = require('./tts')

io.on('connection', function(socket) {
  console.log('connected')
})

let i = 0
// emit tts every 3s
setInterval(() => {
  i++
  db.query('SELECT id, text, SUM(dir) AS like_count FROM protests INNER JOIN votes ON votes.protest_id=protests.id  GROUP BY id ORDER BY SUM(dir) DESC')
  .then((res) => {
    if (res && res[0] && res[0][0]) {
      const protest = res[0][0]
      Protest.findOne({
        where: {id: protest.id}
      })
      .then((inst) => inst.destroy())
      return tts(protest.text)
      .then((res) => {
        io.emit('protest', res)
      })
    }
  })
}, 60000)

// secure express app by setting security headers
app.use(helmet())
// logging middleware
isProduction ? app.use(morgan('combined')) : app.use(morgan('dev'))

// Pretty error prints errors all pretty.
const prettyError = new PrettyError

// Skip events.js and http.js and similar core node files.
prettyError.skipNodeFiles()

// Skip all the trace lines about express' core and sub-modules.
prettyError.skipPackage('express')

module.exports = app
  // Session middleware - compared to express-session (which is what's used in the Auther workshop), cookie-session stores sessions in a cookie, rather than some other type of session store.
  // Cookie-session docs: https://www.npmjs.com/package/cookie-session
  .use(require('cookie-session')({
    name: 'session',
    keys: [sessionSecret || 'an insecure secret key'],
  }))

  // Body parsing middleware
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

  // Authentication middleware
  .use(passport.initialize())
  .use(passport.session())

  // Serve static files from ../public
  .use(express.static(resolve(__dirname, '..', 'public')))

  // Serve our api - ./api also requires in ../db, which syncs with our database
  .use('/api', require('./api'))

  // any requests with an extension (.js, .css, etc.) turn into 404
  .use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // Send index.html for anything else.
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

  // Error middleware interceptor, delegates to same handler Express uses.
  // https://github.com/expressjs/express/blob/master/lib/application.js#L162
  // https://github.com/pillarjs/finalhandler/blob/master/index.js#L172
  .use((err, req, res, next) => {
    console.error(prettyError.render(err))
    finalHandler(req, res)(err)
  })

if (module === require.main) {
  // Start listening only if we're the main module.
  //
  // https://nodejs.org/api/modules.html#modules_accessing_the_main_module
  server.listen(
    port,
    () => {
      console.log(`--- Started HTTP Server for ${appName} ---`)
      const { address, port } = server.address()
      const host = address === '::' ? 'localhost' : address
      const urlSafeHost = host.includes(':') ? `[${host}]` : host
      console.log(`Listening on http://${urlSafeHost}:${port}`)
    }
  )
}

// This check on line 64 is only starting the server if this file is being run directly by Node, and not required by another file.
// Bones does this for testing reasons. If we're running our app in development or production, we've run it directly from Node using 'npm start'.
// If we're testing, then we don't actually want to start the server; 'module === require.main' will luckily be false in that case, because we would be requiring in this file in our tests rather than running it directly.
