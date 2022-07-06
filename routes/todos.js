const { Router } = require('express');
const router = Router();

const { addTodo, checkIfTodoAlreadyExists, getTodos, deleteTodo } = require('../model/todosdb');
const { checkIfUserExists } = require('../model/accountdb');

router.post('/', async (request, response) => {
    const resObj = {
        success: false
    }

    const todo = request.body;

    const userExists = await checkIfUserExists(todo);

    if (userExists.length > 0) {
        const todoAlreadyExists = await checkIfTodoAlreadyExists(todo);
        if (todoAlreadyExists.length > 0) {
            resObj.message = 'todo already in todo-list';
        } else {
            await addTodo(todo);
            resObj.success = true;
            resObj.todo = todo.todo;
        }
    } else {
        resObj.message = 'Not logged in';
    }

    console.log(todo);

    response.json(resObj);
});

router.get('/gettodos/:user', async (request, response) => {

    const user = request.params.user;

    const resObj = {
        success: false,
        // message: `cannot find user ${user}`
    }
    // console.log(user);
    const todoList = await getTodos(user);
    // console.log(todoList);

    const todos = [];

    for (let i = 0; i < todoList.length; i++) {
        const userTodos = {
            todo: todoList[i].todo
        }

        todos.push(userTodos);
    }

    if (todoList.length > 0) {
        resObj.success = true;
        resObj.todos = todos;
    } else {
        resObj.message = `user ${user} has no todos or doesnt have an account`;
    }

    // console.log('todos(array to push to):', todos);
    // console.log('todoList(created by function):', todoList.length);

    response.json(resObj);
});

router.post('/delete', async (request, response) => {
    const resObj = {
        success: false
    }

    const todoData = request.body;

    const result = await deleteTodo(todoData);
    console.log(result);

    if (result) {
        resObj.success = true;
        resObj.message = `deleted todo: ${todoData.todo}`;
    } else {
        resObj.message = `todo: ${todoData.todo} doesnt exist or user doesnt exist`;
    }
    

    response.json(resObj);
});

module.exports = router;
