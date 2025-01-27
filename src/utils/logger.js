import log from "loglevel";

// Set the default logging level (adjust as needed)
log.setDefaultLevel("info");

// Optional: Change logging level based on the environment
if (process.env.NODE_ENV === "production") {
  log.setLevel("warn"); // Only log warnings and errors in production
} else {
  log.setLevel("debug"); // Log everything in development
}

export default log;
