const db = require('../db');

class BaseModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  query() {
    return db(this.tableName);
  }

  findById(id) {
    return this.query().where({ id }).first();
  }

  findAll() {
    return this.query();
  }

  create(data) {
    return this.query().insert(data);
  }

  update(id, data) {
    return this.query().where({ id }).update(data);
  }

  delete(id) {
    return this.query().where({ id }).del();
  }
}

module.exports = BaseModel;
