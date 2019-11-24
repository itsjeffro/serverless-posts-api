const path = require('path');
const exec = require('child_process').exec;

/**
 * Process migrations.
 */
module.exports.process = (event) => {
  let knexBin = path.resolve(__dirname, './../node_modules/.bin/knex');

  console.log('COMMAND: ' + knexBin);

  exec(knexBin + ' migrate:latest', (error, stdout, stderr) => {
    if (error) {
      console.error(error);
    } else if (stdout) {
      console.log(`stdout: ${stdout}`);
    } else {
      console.log(`stderr: ${stderr}`);
    }
  });
};
