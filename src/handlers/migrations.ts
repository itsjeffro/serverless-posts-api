import Config from './../lib/Config';

const knex = require('knex/knex');
const database = require('../../config/database');
const { resolveEnvironmentConfig } = require('knex/bin/utils/cli-config-utils');

module.exports.process = async (event: any) => {
  let config = new Config(database);
  let driver = config.get('default');
  let connection = config.get(`connections.${driver}`);

  let env = {
    configuration: {
      client: connection.driver,
      connection: {
        host:     connection.host,
        database: connection.database,
        user:     connection.username,
        password: connection.password,
        port:     connection.port
      },
      migrations: {
        tableName: 'migrations'
      }
    }
  };

  const resolvedConfig = resolveEnvironmentConfig({}, env.configuration);

  return new Promise((resolve, reject) => {
    knex(resolvedConfig)
      .migrate
      .latest()
      .then(([batchNo, log]: Array<any>) => {
        let message = '';
  
        if (log.length === 0) {
          message += 'Already up to date. ';
        }
  
        message += `Batch ${batchNo} run: ${log.length} migrations` + log.join('\n');
  
        resolve(message);
      })
      .catch((text: any) => {
        reject(Error(text));
      });
  });
};
