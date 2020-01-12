import { LoggerInterface } from "./LoggerInterface";

export default class Log implements LoggerInterface {
  public info(message: string, context?: object) {
    this.log('info', message, context);
  }

  public debug(message: string, context?: object) {
    this.log('debug', message, context);
  }

  public notice(message: string, context?: object) {
    this.log('notice', message, context);
  }

  public warning(message: string, context?: object) {
    this.log('warning', message, context);
  }

  public error(message: string, context?: object) {
    this.log('error', message, context);
  }

  public critical(message: string, context?: object) {
    this.log('critical', message, context);
  }

  public alert(message: string, context?: object) {
    this.log('alert', message, context);
  }

  public emergency(message: string, context?: object) {
    this.log('emergency', message, context);
  }

  public log(level: string, message: string, context?: object) {
    console.log(level.toUpperCase(), message, context);
  }
}