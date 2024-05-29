// utils/errorHandler.ts
export function createErrorResponse(code: number, message: string, details: string) {
  return {
    status: "error",
    data: null,
    error: {
      code,
      message,
      details,
    },
  };
}
