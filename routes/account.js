const { Router, response } = require('express');
const router = Router();

const { checkIfAccountExists, createAccount, compareCredentials } = require('../model/accountdb');

router.post('/signup', async (request, response) => {
    const resObj = {
        success: false
    }

    const credentials = request.body;
    const accountExists = await checkIfAccountExists(credentials);

    if (accountExists.length > 0) {
        resObj.message = 'Account already exists';
    } else {
        await createAccount(credentials);
        resObj.success = true;
        resObj.message = `Account created! username: ${credentials.username}`;
    }

    response.json(resObj);
});

router.post('/login', async (request, response) => {
    const resObj = {
        success: false,
        message: 'Wrong username and/or password'
    }

    const credentials = request.body;
    const result = await compareCredentials(credentials);

    if (result.length > 0) {
        resObj.success = true;
        resObj.message = `Logged in as user: ${credentials.username}`;
    }

    response.json(resObj);
});

module.exports = router;
