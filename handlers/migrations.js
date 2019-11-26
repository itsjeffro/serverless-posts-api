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
module.exports.process = (event, context, callback) => {
  let env = {};

  env.configuration = knexfile;

  const resolvedConfig = resolveEnvironmentConfig({}, env.configuration);

  knex(resolvedConfig)
    .migrate
    .latest()
    .then(([batchNo, log]) => {
      let message = '';

      if (log.length === 0) {
        message += 'Already up to date. ';
      }

      message += `Batch ${batchNo} run: ${log.length} migrations` + log.join('\n');

      callback(null, message);
    })
    .catch((text) => {
      callback(Error(text));
    });
};