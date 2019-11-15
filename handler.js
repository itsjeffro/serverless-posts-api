'use strict';

module.exports.authorizer = async (event, context, callback) => {
  let policy = {
    "principalId": "user-id", 
    "policyDocument": {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": "execute-api:Invoke", 
          "Effect": "Allow",
          "Resource": event.methodArn
        }
      ]
    }, 
  };
  
  return callback(null, policy);
}

module.exports.getPosts = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify([]),
  };
}

module.exports.getPost = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
}

module.exports.createPost = async (event) => {
  return {
    statusCode: 201,
    body: JSON.stringify({}),
  };
}

module.exports.updatePost = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
}

module.exports.deletePost = async (event) => {
  return {
    statusCode: 204,
    body: JSON.stringify(null),
  };
}