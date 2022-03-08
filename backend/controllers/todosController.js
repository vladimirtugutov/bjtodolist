const { Todo } = require('../db/models');

exports.showAllTodos = async (req, res) => {
  try {
    const allTodos = await Todo.findAll({
      order: [
        ['id', 'ASC'],
      ],
      raw: true,
    });
    return res.json(allTodos);
  } catch (error) {
    return res.status(400).json({ message: 'Ошибка' });
  }
};

exports.createTodo = async (req, res) => {
  const { userName, email, text } = req.body;
  await Todo.create({
    userName, email, text, status: false, edited: false,
  });
  const todo = await Todo.findOne({
    order: [
      ['createdAt', 'DESC'],
    ],
    raw: true,
  });
  res.json(todo.id);
};

exports.editTodo = async (req, res) => {
  const { text } = req.body;
  const todo = await Todo.findOne({ where: { id: req.params.id } });
  await todo.update({ text, edited: true });
  await todo.save();
  res.sendStatus(200);
};

exports.toggleTodo = async (req, res) => {
  const todo = await Todo.findOne({ where: { id: req.params.id } });
  const newStatus = !todo.status;
  await todo.update({ status: newStatus });
  await todo.save();
  res.sendStatus(200);
};
