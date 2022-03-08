const express = require('express');

const router = express.Router();

const {
  checkUserAndCreateSession,
  destroySession,
  checkIfAuth,
} = require('../controllers/authController');

// app.use('/auth', authRouter); - здесь подключен этот роутер
router.post('/signin', checkUserAndCreateSession);
router.get('/logout', destroySession);
router.get('/check', checkIfAuth);

module.exports = router;
