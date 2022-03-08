const express = require('express');

const router = express.Router();

const {
  showAllTodos,
  createTodo,
  editTodo,
  toggleTodo,
} = require('../controllers/todosController');

// '/api/todos'

router.get('/', showAllTodos);
router.post('/', createTodo);
router.put('/:id', editTodo);
router.patch('/:id', toggleTodo);

module.exports = router;
