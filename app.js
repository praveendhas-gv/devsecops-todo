const express = require('express');
const app = express();
const port = 3000;

let todos = [];

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { todos });
});

app.post('/add', (req, res) => {
  const newTodo = req.body.todo;
  if (newTodo) {
    todos.push(newTodo);
  }
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const index = req.body.index;
  if (typeof index !== 'undefined') {
    todos.splice(index, 1);
  }
  res.redirect('/');
});

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`To-Do app running at http://localhost:${port}`);
  });
} else {
  module.exports = () => {
    todos = []; // Reset todos between tests
    return app;
  };
}

