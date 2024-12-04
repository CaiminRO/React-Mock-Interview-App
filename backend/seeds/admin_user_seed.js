require('dotenv').config();
const { hash } = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('users').del();

  // Hash admin user's password
  const adminPassword = process.env.ADMIN_PASSWORD || '123456';
  const hashedPassword = await hash(adminPassword, 10);

  // Insert admin user into the users table
  await knex('users').insert([
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      is_admin: true,
    },
  ]);
};
