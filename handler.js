'use strict';

module.exports.getPosts = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify([]),
  };
}

module.exports.getPost = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
}

module.exports.createPost = async event => {
  return {
    statusCode: 201,
    body: JSON.stringify({}),
  };
}

module.exports.updatePost = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
}

module.exports.deletePost = async event => {
  return {
    statusCode: 204,
    body: JSON.stringify(null),
  };
}