import { BaseModel } from './Base';

export class BrandModel extends BaseModel {
  static tableName = 'brands';
  name: string;
  description: string;
  image: string;
  slug: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.is_deleted;
    return json;
  }
}
