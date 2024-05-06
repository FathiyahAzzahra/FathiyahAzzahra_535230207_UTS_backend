const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');
const loginAttemptTracker = {};

function hasExceededAttemptLimit(email) {
  return loginAttemptTracker[email] && loginAttemptTracker[email].attempts >= 5;
}

function recordFailedAttempt(email) {
  if (!loginAttemptTracker[email]) {
    loginAttemptTracker[email] = { attempts: 1, lastAttemptTime: Date.now() };
  } else {
    loginAttemptTracker[email].attempts++;
    loginAttemptTracker[email].lastAttemptTime = Date.now();
  }
}

/**
 * Handle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function login(request, response, next) {
  const { email, password } = request.body;

  try {
    if (hasExceededAttemptLimit(email)) {
      throw errorResponder(
        errorTypes.FORBIDDEN,
        'Too many failed login attempts.'
      );
    }

    // Check login credentials
    const loginSuccess = await authenticationServices.checkLoginCredentials(
      email,
      password
    );

    if (!loginSuccess) {
      recordFailedAttempt(email);
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Wrong email or password'
      );
    }
    delete loginAttemptTracker[email];

    return response.status(200).json(loginSuccess);
  } catch (error) {
    return next(error);
  }
}

setInterval(
  () => {
    const now = Date.now();
    Object.keys(loginAttemptTracker).forEach((email) => {
      if (now - loginAttemptTracker[email].lastAttemptTime >= 30 * 60 * 1000) {
        delete loginAttemptTracker[email];
      }
    });
  },
  30 * 60 * 1000
);

module.exports = {
  login,
};
