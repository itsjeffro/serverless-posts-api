import Config from './index';

describe('Test database configuration', () => {
  let items = {
    default: 'mysql',
    connections: {
      mysql: {
        driver: "mysql2",
      }
    }
  };

  const config = new Config(items);

  test('Returns value using a valid single-level key', () => {
    expect(config.get('default')).toBe('mysql');
  });

  test('Returns value using a valid multi-level key', () => {
    let driver = config.get('default');

    expect(config.get('connections.' + driver + '.driver')).toBe('mysql2');
  });

  test('Returns default value when an invalid single-level key is provided', () => {
    expect(config.get('invalidKey', 'default')).toBe('default');
  });

  test('Returns default value when an invalid single-level key is provided with no default value', () => {
    expect(config.get('invalidKey')).toBe(null);
  });

  test('Returns default value when an invalid multi-level key is provided', () => {
    expect(config.get('connections.key', 'default')).toBe('default');
  });

  test('Returns null when an invalid multi-level key is provided with no default value', () => {
    expect(config.get('connections.key')).toBe(null);
  });

});