const nedb = require('nedb-promise');

const database = new nedb({ filename: 'accounts.db', autoload: true });

async function createAccount(account) {
    const result = await database.insert(account);
    return result;
}

async function checkIfAccountExists(credentials) {
    const result = database.find({ username: credentials.username });
    return result;
}

async function compareCredentials(credentials) {
    const result = database.find({ $and: [{ username: credentials.username }, { password: credentials.password }] });
    return result;
}

async function checkIfUserExists(todo) {
    const result = await database.find({ username: todo.username });
    return result;
}

module.exports = { createAccount, checkIfAccountExists, compareCredentials, checkIfUserExists };