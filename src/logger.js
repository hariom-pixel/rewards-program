// src/logger.js
import log from 'loglevel'

// Set the default log level based on the environment
if (process.env.NODE_ENV === 'development') {
  log.setLevel('debug')
} else {
  log.setLevel('warn')
}

// Export the logger for use in other modules
export default log
