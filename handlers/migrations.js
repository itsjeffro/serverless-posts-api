const path = require('path');
const exec = require('child_process').exec;
const fs = require('fs')

/**
 * Process migrations.
 */
module.exports.process = async (event) => {
  let knexBin = path.resolve(__dirname, './../node_modules/.bin/knex');

  console.log('COMMAND: ' + knexBin);

  fs.access(knexBin, fs.F_OK, (error) => {
    if (error) {
      throw 'File does not exist in path';
    }
  
    exec(knexBin + ' migrate:latest', (error, stdout, stderr) => {
      if (error) {
        console.error(error);
      } else if (stdout) {
        console.log(`stdout: ${stdout}`);
      } else {
        console.log(`stderr: ${stderr}`);
      }
    });
  });
};
