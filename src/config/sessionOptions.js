/**
 * @file This module contains the options object for the session middleware.
 * @module sessionOptions
 * @author Hao Chen
 * @see {@link https://github.com/expressjs/session}
 */

// Options object for the session middleware.
export const sessionOptions = {
  name: 'sid', // Session ID cookie name.
  secret: process.env.SESSION_SECRET, // Secret for signing the session ID cookie.
  resave: false, // Resave even if a request is not changing the session.
  saveUninitialized: false, // Don't save a created but not modified session.
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: 'None', // Allow cross-origin cookies
    secure: process.env.NODE_ENV === 'production', // Serve secure cookies in production
  }
}

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // Trust first proxy if you're behind one (e.g., Heroku, AWS ELB)
  sessionOptions.cookie.secure = true; // Serve secure cookies
}
