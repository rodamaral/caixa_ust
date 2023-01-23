import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import { env } from './env'
import { authRouter } from './routes/auth'
import { protectedRouter } from './routes/protected'

const maxAge = 10 * 60 * 1000

const app = express()

app.use(express.json())

if (import.meta.env.DEV) {
  app.use(morgan('dev'))
}
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'))

app.use(
  session({
    secret: env.SESSION_SECRET, // TODO: create an actual session secret
    resave: false, // FIXME: depends on store
    saveUninitialized: false, // TODO
    rolling: true,
    cookie: {
      maxAge,
      httpOnly: true,
    },
  })
)

app.use((req, res, next) => {
  if (req.session.user) {
    // this allows checking if a session exists from client side JavaScript
    // as the session cookie is protected with httpOnly
    res.cookie('authenticated', true, {
      maxAge,
    })
  }
  next()
})

app.use('/api/auth', authRouter)
app.use('/api/', protectedRouter)

export const handler = app
