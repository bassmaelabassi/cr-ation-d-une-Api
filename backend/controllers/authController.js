const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email déjà utilisé' });

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: 'Inscription réussie' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    req.session.user = user._id;

    res.json({ 
      token,
      user: { id: user._id, name: user.name, email: user.email },
      message: 'Connexion réussie' 
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la déconnexion' });
      }
      
      res.clearCookie('connect.sid');
      res.json({ message: 'Déconnexion réussie' });
    });
  } else {
    res.json({ message: 'Déconnexion réussie' });
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const userId = req.userId || req.session?.user;
    
    if (!userId) {
      return res.status(401).json({ error: 'Non authentifié' });
    }
    
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    
    res.json(user);
  } catch (err) {
    next(err);
  }
};