const express = require('express');

const app = express();
const port = (process.env.port || 3000);

const taskRouter = require('./routers/task');

app.use(express.json());
app.use('/tasks', taskRouter);

app.get('/', (req, res) => {
  res.send('We have a get request at the root');
});

app.listen(port, () => {
  console.log(`The server is listening on port : ${port}`);
});