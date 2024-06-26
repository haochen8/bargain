/**
 * @file Defines the server for the application.
 * @module src/server
 * @author Hao Chen
 * @version 3.1.0
 */

import "@lnu/json-js-cycle";
import cors from "cors";
import express from "express";
import session from "express-session";
import httpContext from "express-http-context";
import helmet from "helmet";
import { randomUUID } from "node:crypto";
import http from "node:http";
import { connectToDatabase } from "./src/config/mongoose.js";
import { sessionOptions } from "./src/config/sessionOptions.js";
import { morganLogger } from "./src/config/morgan.js";
import { logger } from "./src/config/winston.js";
import { router } from "./src/routes/router.js";
import cookieParser from "cookie-parser";

try {
  // Connect to MongoDB.
  await connectToDatabase(process.env.DB_CONNECTION_STRING);

  // Create an Express application.
  const app = express();

  // Set various HTTP headers to make the application little more secure (https://www.npmjs.com/package/helmet).
  app.use(helmet());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "cdn.jsdelivr.net"],
      },
    })
  );

  // Parse cookies.
  app.use(cookieParser());

  // Define the allowed origins.
  const allowedOrigins = [
    "https://bargainnow.netlify.app",
    "http://localhost:3000",
  ];

  // Enable Cross Origin Resource Sharing (CORS) (https://www.npmjs.com/package/cors).
  app.use(
    cors({
      origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg =
            "The CORS policy for this site does not allow access from the specified Origin.";
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
      credentials: true, // Allow cookies to be sent to/from the client.
      methods: "GET, POST, PUT, DELETE",
      allowedHeaders: "Content-Type, Authorization",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })
  );

  // Parse requests of the content type application/json.
  app.use(express.json({ limit: "500kb" }));

  // Add the request-scoped context.
  // NOTE! Must be placed before any middle that needs access to the context!
  //       See https://www.npmjs.com/package/express-http-context.
  app.use(httpContext.middleware);

  // Use a morgan logger.
  app.use(morganLogger);

  // Use the express-session middleware.
  app.use(session(sessionOptions));

  // Middleware to be executed before the routes.
  app.use((req, res, next) => {
    // Add a request UUID to each request and store information about
    // each request in the request-scoped context.
    req.requestUuid = randomUUID();
    httpContext.set("request", req);

    next();
  });

  // // Register routes.
  app.use("/", router);

  // Error handler.
  app.use((err, req, res, next) => {
    logger.error(err.message, { error: err });

    if (process.env.NODE_ENV === "production") {
      // Ensure a valid status code is set for the error.
      // If the status code is not provided, default to 500 (Internal Server Error).
      // This prevents leakage of sensitive error details to the client.
      if (!err.status) {
        err.status = 500;
        err.message = http.STATUS_CODES[err.status];
      }

      // Send only the error message and status code to prevent leakage of
      // sensitive information.
      res.status(err.status).json({
        status: err.status,
        message: err.message,
      });

      return;
    }

    // ---------------------------------------------------
    // ⚠️ WARNING: Development Environment Only!
    //             Detailed error information is provided.
    // ---------------------------------------------------

    // Deep copies the error object and returns a new object with
    // enumerable and non-enumrele properties (cyclical structures are handled).
    const copy = JSON.decycle(err, { includeNonEnumerableProperties: true });

    return res.status(err.status || 500).json(copy);
  });

  // Starts the HTTP server listening for connections.
  const server = app.listen(process.env.PORT, () => {
    console.log(process.env.DB_CONNECTION_STRING);
    console.log(`Server running at http://localhost:${server.address().port}`);
    console.log("Press Ctrl-C to terminate...");
  });
} catch (err) {
  logger.error(err.message, { error: err });
  process.exitCode = 1;
}
