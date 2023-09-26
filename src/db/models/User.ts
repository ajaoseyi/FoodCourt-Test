import { BaseModel } from './Base';

export class UserModel extends BaseModel {
  static tableName = 'users';
  name: string;
  email: string;
  password: string;

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }
}
