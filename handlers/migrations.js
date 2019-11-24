const path = require('path');
const exec = require('child_process').exec;

/**
 * Process migrations.
 */
module.exports.process = (event) => {
  let knexBin = process.env.LAMBDA_TASK_ROOT + '/node_modules/.bin/knex';

  console.log('Command path: ' + knexBin);

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