import { useCallback } from "react";

type LogLevel = "error" | "info" | "debug";

const useLogger = () => {
  const shouldLog = useCallback((level: LogLevel): boolean => {
    if (process.env.NODE_ENV === "production") {
      return false;
    }
    return true;
  }, []);

  const error = useCallback(
    (message: string, ...args: any[]) => {
      if (shouldLog("error")) {
        console.error(`[ERROR] ${message}`, ...args);
      }
    },
    [shouldLog]
  );

  const info = useCallback(
    (message: string, ...args: any[]) => {
      if (shouldLog("info")) {
        console.info(`[INFO] ${message}`, ...args);
      }
    },
    [shouldLog]
  );

  const debug = useCallback(
    (message: string, ...args: any[]) => {
      if (shouldLog("debug")) {
        console.debug(`[DEBUG] ${message}`, ...args);
      }
    },
    [shouldLog]
  );

  return { error, info, debug };
};

export default useLogger;
