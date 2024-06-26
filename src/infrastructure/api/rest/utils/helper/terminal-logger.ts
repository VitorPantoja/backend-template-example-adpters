const COLORS = {
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  purple: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  reset: "\x1b[0m",
  none: "",
} as const;

const LEVEL_LOGGER_COLOR: Record<LoggerLevel, string> = {
  DEFAULT: COLORS["reset"],
  ERROR: COLORS["red"],
  INFO: COLORS["cyan"],
  SUCCESS: COLORS["green"],
  WARN: COLORS["yellow"],
  DEBUG: COLORS["purple"],
};

export type LoggerLevel = "INFO" | "WARN" | "SUCCESS" | "ERROR" | "DEBUG" | "DEFAULT";

export type LoggerOption = {
  scope: string;
  level: LoggerLevel;
};

export class TerminalLogger {
  static DEFAULT_LOGGER_OPTIONS: LoggerOption = {
    level: "INFO",
    scope: "GLOBAL",
  };

  static log(message: string, options?: LoggerOption, ...meta: string[]): void {
    let timestamp: string = new Date().toLocaleString();
    let scope = options?.scope ?? TerminalLogger.DEFAULT_LOGGER_OPTIONS.scope;
    let level = options?.level ?? TerminalLogger.DEFAULT_LOGGER_OPTIONS.level;
    let metaData: string = meta?.length ? meta.toString() : "";

    timestamp = LEVEL_LOGGER_COLOR["DEFAULT"].concat(
      timestamp,
      LEVEL_LOGGER_COLOR["DEFAULT"]
    );
    message = LEVEL_LOGGER_COLOR[level].concat(
      message,
      LEVEL_LOGGER_COLOR["DEFAULT"]
    );
    scope = LEVEL_LOGGER_COLOR["DEBUG"].concat(
      scope,
      LEVEL_LOGGER_COLOR["DEFAULT"]
    );
    level = LEVEL_LOGGER_COLOR[level].concat(
      level,
      LEVEL_LOGGER_COLOR["DEFAULT"]
    ) as LoggerLevel;
    metaData = meta
      ? LEVEL_LOGGER_COLOR["WARN"].concat(
          meta.toString(),
          LEVEL_LOGGER_COLOR["DEFAULT"]
        )
      : "";

    process.stdout.write(
      `{"level":${level}, "scope":"${scope}", "timestamp":"${timestamp}", "message":"${message}"," "metaData":"${metaData}"}\n`
    );
  }
}
