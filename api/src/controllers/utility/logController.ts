/* Winston Import */
import { createLogger, format, transports } from "winston";

/* Daily Rotate File */
import DailyRotateFile from "winston-daily-rotate-file";

/* Log Format */
const logFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

/* Logger */
const logger = createLogger({
  format: format.combine(format.timestamp(), logFormat),
  transports: [
    new transports.Console(),
    // new transports.File({ filename: "/usr/src/app/logs/adult.log" }),
    new DailyRotateFile({
      // filename: "/home/nick/logs/travel-%DATE%.log",
      filename: "/usr/src/app/logs/travel-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

export default logger;
