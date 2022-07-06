const nedb = require('nedb-promise');

const database = new nedb({ filename: 'todos.db', autoload: true });

async function addTodo(todo) {
    const result = database.insert({ username: todo.username, todo: todo.todo });
    return result;
}

async function checkIfTodoAlreadyExists(todo) {
    const result = database.find({ $and: [{ username: todo.username }, { todo: todo.todo }] });
    return result;
}

async function getTodos(user) {
    const result = database.find({ username: user });
    return result;
}

async function deleteTodo(todoData) {
    const result = database.remove({ $and: [{ username: todoData.user }, { todo: todoData.todo }] });
    return result;
}

module.exports = { addTodo, checkIfTodoAlreadyExists, getTodos, deleteTodo };