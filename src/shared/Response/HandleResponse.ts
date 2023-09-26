export default class HandleResponse {
  public static response(
    statusCode: number,
    _success: boolean,
    message: string,
    data?: any,
  ) {
    return { statusCode, success: _success, message, data };
  }
}
