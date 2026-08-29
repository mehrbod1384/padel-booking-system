type Level = "info" | "warn" | "error";

function emit(level: Level, message: string, meta?: unknown) {
  const prefix = `[${new Date().toISOString()}] ${level.toUpperCase()}`;

  if (level === "error") {
    console.error(prefix, message, meta ?? "");
  } else if (level === "warn") {
    console.warn(prefix, message, meta ?? "");
  } else {
    console.log(prefix, message, meta ?? "");
  }
}

export const logger = {
  info: (message: string, meta?: unknown) => emit("info", message, meta),
  warn: (message: string, meta?: unknown) => emit("warn", message, meta),
  error: (message: string, meta?: unknown) => emit("error", message, meta),
};
