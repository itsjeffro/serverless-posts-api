import ObjectRepository from './index';

describe('Test database configuration', () => {
  let items = {
    default: 'mysql',
    connections: {
      mysql: {
        driver: "mysql2",
      }
    }
  };

  const objectRepository = new ObjectRepository;

  test('Returns value using a valid single-level key', () => {
    expect(objectRepository.get(items, 'default')).toBe('mysql');
  });

  test('Returns value using a valid multi-level key', () => {
    let driver = objectRepository.get(items, 'default');

    expect(objectRepository.get(items, 'connections.' + driver + '.driver')).toBe('mysql2');
  });

  test('Returns default value when an invalid single-level key is provided', () => {
    expect(objectRepository.get(items, 'invalidKey', 'default')).toBe('default');
  });

  test('Returns default value when an invalid single-level key is provided with no default value', () => {
    expect(objectRepository.get(items, 'invalidKey')).toBe(null);
  });

  test('Returns default value when an invalid multi-level key is provided', () => {
    expect(objectRepository.get(items, 'connections.key', 'default')).toBe('default');
  });

  test('Returns null when an invalid multi-level key is provided with no default value', () => {
    expect(objectRepository.get(items, 'connections.key')).toBe(null);
  });

});