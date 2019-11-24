const database = require('./config/database');
const Config = require('./src/Config');

let config = new Config(database);
let driver = config.get('default');
let connection = config.get(`connections.${driver}`);

module.exports = {
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
};
