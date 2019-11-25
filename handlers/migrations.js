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
module.exports.process = (event) => {
  let env = {};

  env.configuration = knexfile;

  const resolvedConfig = resolveEnvironmentConfig({}, env.configuration);

  return knex(resolvedConfig)
    .migrate
    .latest()
    .then(([batchNo, log]) => {
      if (log.length === 0) {
        console.log('Already up to date');
      }

      success(`Batch ${batchNo} run: ${log.length} migrations` + log.join('\n'));
    })
    .catch(exit);
};