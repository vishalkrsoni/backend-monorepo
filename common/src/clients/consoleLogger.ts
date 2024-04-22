interface Logger {
  debug(...args: any[]): void;
  info(...args: any[]): void;
  error(...args: any[]): void;
  warn(...args: any[]): void;
  log(...args: any[]): void;
}

export class ConsoleLogger implements Logger {
  constructor(private environment: string) {}
  log(...args: any[]) {
    console.log(...args);
  }
  info(...args: any[]) {
    console.info(...args);
  }
  warn(...args: any[]) {
    console.warn(...args);
  }
  error(...args: any[]) {
    console.error(...args);
  }
  debug(...args: any[]) {
    if (this.environment !== 'prod') console.debug(...args);
    // console.log(...args);
  }
}
