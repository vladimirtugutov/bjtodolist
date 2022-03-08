const bcrypt = require('bcrypt');
const { User } = require('../db/models');

exports.checkUserAndCreateSession = async (req, res) => {
  const { login, password } = req.body;
  try {
    if (login && password) {
      const user = await User.findOne({ where: { login } });
      if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = {
          login: user.login,
          id: user.id,
        };
        return res.json({
          login: user.login,
          id: user.id,
        });
      }
      return res.json({
        login: 'Данные введены неверно!',
        id: null,
      });
    }
  } catch (error) {
    return res.status(400).json({ message: 'Пользователь не существует' });
  }
};

exports.destroySession = (req, res) => {
  try {
    req.session.destroy();
    res.cookie('sid', '00', { expires: new Date() });
    res.clearCookie('sid');
    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).json({ message: 'Произошла ошибка' });
  }
};

exports.checkIfAuth = (req, res) => {
  try {
    if (req.session?.user?.id) {
      res.json(req.session.user);
    } else {
      res.json('не авторизован!');
    }
  } catch (error) {
    return res.status(400).json({ message: 'Произошла ошибка' });
  }
};
