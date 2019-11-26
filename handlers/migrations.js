const knexfile = require('../knexfile');
const knex = require('knex/knex');

const {
  mkConfigObj,
  resolveKnexFilePath,
  resolveEnvironmentConfig,
  exit,
  success,
  checkLocalModule,
  getMigrationExtension,
  getSeedExtension,
  getStubPath,
} = require('knex/bin/utils/cli-config-utils');

/**
 * Process migrations.
 */
module.exports.process = async (event, context, callback) => {
  let env = {};

  env.configuration = knexfile;

  const resolvedConfig = resolveEnvironmentConfig({}, env.configuration);

  return new Promise((resolve, reject) => {
    knex(resolvedConfig)
      .migrate
      .latest()
      .then(([batchNo, log]) => {
        let message = '';
  
        if (log.length === 0) {
          message += 'Already up to date. ';
        }
  
        message += `Batch ${batchNo} run: ${log.length} migrations` + log.join('\n');
  
        resolve(null, message);
      })
      .catch((text) => {
        reject(Error(text));
      });
  });
};