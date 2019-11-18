const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

/**
 * Retrive posts.
 */
module.exports.getPosts = async (event) => {
  connection.changeUser({ database: process.env.DB_DATABASE }, error => {
    if (error) {
      throw error;
    }
  });
  
  return new Promise((resolve, reject) => {
    connection.execute("SELECT * FROM posts", (error, rows, fields) => {
      if (error) {
        throw error;
      }
      
      resolve({
        statusCode: 200,
        body: JSON.stringify(rows),
      });
    });
  });
};

/**
 * Retrive a single post.
 */
module.exports.getPost = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
};

/**
 * Create a single post.
 */
module.exports.createPost = async (event) => {
  return {
    statusCode: 201,
    body: JSON.stringify({}),
  };
};

/**
 * Update a single post.
 */
module.exports.updatePost = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
};

/**
 * Delete a single post.
 */
module.exports.deletePost = async (event) => {
  return {
    statusCode: 204,
    body: JSON.stringify(null),
  };
};