export async function up(queryInterface) {
  await queryInterface.bulkInsert('users', [
    { name: 'Farhad', email: 'farhad@example.com', password: 'hashed_pw', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Alice', email: 'alice@example.com', password: 'hashed_pw', createdAt: new Date(), updatedAt: new Date() },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('users', null, {});
}