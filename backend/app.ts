import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import { authRouter } from './routes/auth'
import { protectedRouter } from './routes/protected'

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'))

declare module 'express-session' {
  interface SessionData {
    user: { name: string; permission: unknown[] }
  }
}

app.use(
  session({
    secret: 'MY_SECRET_s3#<.Fe$=+', // TODO: create an actual session secret
    resave: false, // FIXME: depends on store
    saveUninitialized: false, // TODO
    rolling: true,
    cookie: {
      maxAge: 20 * 1000,
      httpOnly: true,
    },
  })
)

app.use((req, res, next) => {
  if (req.session.user) {
    // this allows checking if a session exists from client side JavaScript
    // as the session cookie is protected with httpOnly
    res.cookie('authenticated', true, {
      maxAge: 20 * 1000,
    })
  }
  next()
})

app.use('/api/auth', authRouter)
app.use('/api/', protectedRouter)

export const handler = app
