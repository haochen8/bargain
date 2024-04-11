/**
 * @file This module contains the options object for the session middleware.
 * @module sessionOptions
 * @author Hao Chen
 * @see {@link https://github.com/expressjs/session}
 */

// Options object for the session middleware.
export const sessionOptions = {
  name: 'sid', // Session ID cookie name.
  secret: 'key that will sign cookie',
  resave: false, // Resave even if a request is not changing the session.
  saveUninitialized: false, // Don't save a created but not modified session.
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: 'strict'
  }
}

if (process.env.NODE_ENV === 'production') {
  sessionOptions.cookie.secure = true // serve secure cookies
}
