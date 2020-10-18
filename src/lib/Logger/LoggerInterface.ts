import { SelfManagedActiveDirectoryConfigurationUpdates } from "aws-sdk/clients/fsx";

export interface LoggerInterface {
  /**
   * Interesting events.
   *
   * Example: User logs in, SQL logs.
   */
  info(message: string, context: object): any;

  /**
   * Detailed debug information.
   */
  debug(message: string, context: object): any;

  /**
   * Normal but significant events.
   */
  notice(message: string, context: object): any;

  /**
   * Exceptional occurrences that are not errors.
   *
   * Example: Use of deprecated APIs, poor use of an API, undesirable things
   * that are not necessarily wrong.
   */
  warning(message: string, context: object): any;

  /**
   * Runtime errors that do not require immediate action but should typically
   * be logged and monitored.
   */
  error(message: string, context: object): any;

  /**
   * Critical conditions.
   *
   * Example: Application component unavailable, unexpected exception.
   */
  critical(message: string, context: object): any;

  /**
   * Action must be taken immediately.
   *
   * Example: Entire website down, database unavailable, etc. This should
   * trigger the SMS alerts and wake you up.
   */
  alert(message: string, context: object): any;

  /**
   * System is unusable.
   */
  emergency(message: string, context: object): any;

  /**
   * Logs with an arbitrary level.
   */
  log(level: string, message: string, context?: object): any;
}