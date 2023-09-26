// src/models/Admin.ts

import { BaseModel } from './Base';

class Admin extends BaseModel {
  static tableName = 'admin';

  id: number;
  name: string;
  email: string;
  password: string;

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }
}

export default Admin;
