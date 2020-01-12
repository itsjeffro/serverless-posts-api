import FileLogger from './FileLogger';

describe('Test FileLogger', () => {
  const logger = new FileLogger;

  test('File logger creates file', () => {
    logger
      .setFilePath('./storage/logs')
      .log('DEBUG', 'test', {
        context: 'context'
      });
  });

});