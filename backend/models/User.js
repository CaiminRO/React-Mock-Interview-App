const BaseModel = require('./BaseModel');
const db = require('../db');

class User extends BaseModel {
  constructor() {
    super('users');
  }

  async createUser({ username, email, password, is_admin = false }) {
    const [ id ] = await this.create({ username, email, password, is_admin });
    return { id, username, email };
  }

  findByUsername(username) {
    return this.query().where({ username }).first();
  }

  findByEmail(email) {
    return this.query().where({ email }).first();
  }

  async update(id, data) {
    await this.query().where({ id }).update(data);
    return this.findById(id);
  }

  findAllWithTaskCounts() {
    return this.query()
      .leftJoin('todos', 'users.id', 'todos.user_id')
      .groupBy('users.id')
      .select(
        'users.id',
        'users.username',
        'users.email',
        'users.is_admin',
        db.raw('COUNT(todos.id) AS total_tasks'),
        db.raw('COUNT(CASE WHEN todos.completed = 1 THEN 1 END) AS completed_tasks')
      );
  }
}

module.exports = new User();
