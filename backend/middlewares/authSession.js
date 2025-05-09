const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ error: 'Non authentifié' });
    }
    
    const user = await User.findById(req.session.user);
    if (!user) {
      req.session.destroy();
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }
    
    next();
  } catch (err) {
    res.status(500).json({ error: 'Erreur d\'authentification' });
  }
};