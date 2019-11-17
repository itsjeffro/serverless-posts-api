let jwt = require('jsonwebtoken');

module.exports.authorizer = (event, context, callback) => {
  try {
    let token = event.authorizationToken;
    let decoded = jwt.verify(token, process.env.JWT_SIGNING_KEY);

    // Check scopes to determine if user is unauthorized
    
    return callback(null, generatePolicy('Allow', event));
  } catch (e) {
    return callback("Error: Invalid token");
  }
}

/**
 * Returns policy.
 *
 * @param {string} effect 
 * @param {object} event 
 */
function generatePolicy(effect, event) {
  return {
    "principalId": "user", 
    "policyDocument": {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": "execute-api:Invoke",
          "Effect": effect,
          "Resource": event.methodArn
        }
      ]
    },
    "context": {}
  };
}
