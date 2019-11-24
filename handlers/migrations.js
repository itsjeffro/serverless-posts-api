const path = require('path');
const { exec } = require('child_process')

/**
 * Process migrations.
 */
module.exports.process = async (event) => {
  let knexCommand = path.resolve(__dirname, './../node_modules/.bin/knex');

  console.log('COMMAND: ' + knexCommand);

  exec(knexCommand + ' migrate:latest', (error, stdout, stderr) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }
  });
};
