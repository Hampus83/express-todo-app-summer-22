const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json());

const accountRouter = require('./routes/account');
const todosRouter = require('./routes/todos');

app.use('/api/account', accountRouter);
app.use('/api/todos', todosRouter);

app.listen(PORT, () => {
    console.log(`OK, server started at port: ${PORT}`);
});