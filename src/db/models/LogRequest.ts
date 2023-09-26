// src/models/LogRequest.ts
import { BaseModel } from './Base';

class LogRequest extends BaseModel {
  static tableName = 'log_requests';
  url: string;
  body: object;
  method: string;
}

export default LogRequest;
