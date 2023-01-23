import express from 'express'
import morgan from 'morgan'
import { maxAge } from './constants'
import { authRouter } from './routes/auth'
import { protectedRouter } from './routes/protected'
import { sessionMiddleware } from './session'

const app = express()

app.use(express.json())

if (import.meta.env.DEV) {
  app.use(morgan('dev'))
}
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'))

app.use(sessionMiddleware)

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
