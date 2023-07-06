const express = require('express');
const ejs = require('ejs');
require('dotenv').config();
const tarefaController = require('./controllers/tarefaController');


const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    await tarefaController.getTarefas(req, res);
  });
app.post('/tarefa', tarefaController.addTarefa);
app.get('/tarefa/delete', tarefaController.deleteTarefa);
app.get('/tarefa/edit', tarefaController.editTarefa);
app.post('/tarefa/update', tarefaController.updateTarefa);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

