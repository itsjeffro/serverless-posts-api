import { LoggerInterface } from "../LoggerInterface";

export default class FileLogger implements LoggerInterface {
  filePath: string | undefined;

  info(message: string, context: object) {
    this.write('info', message, context);
  }  
  
  debug(message: string, context: object) {
    this.write('debug', message, context);
  }

  notice(message: string, context: object) {
    this.write('notice', message, context);
  }

  warning(message: string, context: object) {
    this.write('warning', message, context);
  }

  error(message: string, context: object) {
    this.write('error', message, context);
  }

  critical(message: string, context: object) {
    this.write('critical', message, context);
  }

  alert(message: string, context: object) {
    this.write('alert', message, context);
  }

  emergency(message: string, context: object) {
    this.write('emergency', message, context);
  }

  log(level: string, message: string, context?: object) {
    this.write('log', message, context);
  }

  write(level: string, message: string, context?: object) {
    const fs = require('fs');

    let logDirectory = this.getFilePath();

    if (! fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory, { recursive: true }, (error: any) => {
          if (error) throw error;
        });
    }

    let logMessage = `[${this.getFullDateTime()}] local.${level.toUpperCase()}: ${message} ${JSON.stringify(context)}` + '\r\n';

    fs.appendFile(`${logDirectory}/serverless.log`, logMessage, function (error: any) {
      if (error) throw error;
    });
  }

  setFilePath(filePath: string) {
    this.filePath = filePath;
  
    return this;
  }

  getFilePath() {
    let filePath = this.filePath;

    if (filePath !== undefined) {
      filePath = filePath.replace(/\/+$/, '');
    }

    return filePath;
  }

  getFullDateTime() {
    let date = new Date;
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + (date.getDate() + 1)).slice(-2);
    let fullDate = date.getFullYear() + '-' + month + '-' + day;

    let hours = ('0' + date.getHours()).slice(-2);
    let minutes = ('0' + date.getMinutes()).slice(-2);
    let seconds = ('0' + date.getSeconds()).slice(-2);
    let fullTime = hours + ':' + minutes + ':' + seconds;

    return fullDate + ' ' + fullTime;
  }
}