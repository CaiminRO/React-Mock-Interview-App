const BaseModel = require('./BaseModel');

class Todo extends BaseModel {
  constructor() {
    super('todos');
  }

  async createTodo({ text, user_id }) {
    const [id] = await this.create({ text, user_id });
    return this.findById(id);
  }

  findAllByUserId(user_id) {
    return this.query().where({ user_id });
  }

  async updateTodo(id, data) {
    await this.update(id, data);
    return this.findById(id);
  }

  async deleteTodo(id) {
    return this.delete(id);
  }
}

module.exports = new Todo();
