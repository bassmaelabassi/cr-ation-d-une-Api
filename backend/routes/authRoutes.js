const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../validators/authValidator');
const authBasic = require('../middlewares/authBasic');
const authJWT = require('../middlewares/authJWT'); // Middleware importé mais non utilisé
const authSession = require('../middlewares/authSession');

router.post('/register', registerValidator, authCtrl.register);
router.post('/login', loginValidator, authCtrl.login);
router.get('/logout', authSession, authCtrl.logout); // Corrigé : utilisation du middleware authSession au lieu de loginValidator

router.get('/me/basic', authBasic, authCtrl.getMe);
router.get('/me/session', authSession, authCtrl.getMe);
// Ajout d'une route pour utiliser JWT
router.get('/me/jwt', authJWT, authCtrl.getMe);

module.exports = router;