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

  console.log({
    message: `Preparing to connect to database [${connection.database}] on host [${connection.username}@${connection.host}:${connection.port}]`
  });

  const resolvedConfig = resolveEnvironmentConfig({}, env.configuration);

  return new Promise((resolve, reject) => {
    knex(resolvedConfig)
      .migrate
      .latest()
      .then(([batchNo, log]: Array<any>) => {
        let data = {
          message: ''
        };
  
        if (log.length === 0) {
          data = Object.assign({}, data, {
            message: 'Already up to date.'
          });
        }
  
        if (log.length > 0) {
          data = Object.assign({}, data, {
            message: `Batch ${batchNo} run: ${log.length} migrations`,
            migrations: log,
          });
        }

        console.log(data);
  
        resolve(data);
      })
      .catch((text: any) => {
        console.error({ message: `${text}` });

        reject(Error(text));
      });
  });
};
