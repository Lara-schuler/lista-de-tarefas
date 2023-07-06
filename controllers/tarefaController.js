const Tarefa = require('../models/tarefaModel');

async function getTarefas(req, res) {
  try {
    const tarefas = await Tarefa.getAll(); // Aguarda a conclusão da promessa

    console.log(tarefas);
    res.render('tarefas', { tarefas });
  } catch (error) {
    // Lida com o erro, caso ocorra
    res.status(500).send('Ocorreu um erro ao obter as tarefas: ' + error.message);
  }
}

async function buscarTarefa(idTarefa) {
  let tarefas = await Tarefa.getAll();
  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].id == idTarefa) {
      return tarefas[i];
    }
  }
  return null; // Retorna null caso a tarefa não seja encontrada
}


function addTarefa(req, res) {
    const { title, description } = req.body;
    const tarefa = new Tarefa(Date.now(), title, description);
    tarefa.save();
    res.redirect('/tarefas');
}

// Função para deletar tarefa
async function deleteTarefa(req, res) {
    const { id } = req.query;
    Tarefa.delete(id);
    res.redirect('/tarefas');
}

// Função para editar tarefa
async function editTarefa(req, res) {
  const { id } = req.query;
  const tarefa = await buscarTarefa(id); // Adicione o await aqui
  if (!tarefa) {
    return res.status(404).send('Tarefa não encontrada');
  }
  res.render('editTarefa', { tarefa });
}

async function updateTarefa(req, res) {
  const { id } = req.query;
  const { title, description } = req.body;
  const tarefa = buscarTarefa(id);
  
  if (!tarefa) {
    return res.status(404).send('Tarefa não encontrada');
  }
  
  tarefa.title = title;
  tarefa.description = description;
  Tarefa.update(id, title, description);
  
  res.redirect('/tarefas');
}



module.exports = { getTarefas, addTarefa, deleteTarefa, editTarefa, updateTarefa };

