export interface Response<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
}

export function isSuccessResponse<T>(
  response: Response<T>
): response is Response<T> & { success: true } {
  return response.success === true;
}
