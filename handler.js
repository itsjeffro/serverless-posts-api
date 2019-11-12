'use strict';

module.exports.getPosts = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      [],
      null,
      2
    ),
  };
}

module.exports.getPost = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {},
      null,
      2
    ),
  };
}

module.exports.createPost = async event => {
  return {
    statusCode: 201,
    body: JSON.stringify(
      {},
      null,
      2
    ),
  };
}

module.exports.updatePost = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {},
      null,
      2
    ),
  };
}

module.exports.deletePost = async event => {
  return {
    statusCode: 204,
    body: JSON.stringify(
      null,
      null,
      2
    ),
  };
}