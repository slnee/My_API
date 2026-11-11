import userModel from "../models/userModel.js";

function login(req, res) {

  const {
    email,
    password
  } = req.body;

  const user =
    userModel.checkIdentifiants(
      email,
      password
    );

  if (!user) {

    return res.status(401).json({
      erreur:
        "Email ou mot de passe incorrect"
    });

  }

  req.session.user = {
    email: user.email,
    role: user.role
  };

  res.json({
    message: "Connexion réussie",
    user: req.session.user
  });
}


function logout(req, res) {

  req.session.destroy(() => {

    res.json({
      message: "Déconnexion réussie"
    });

  });
}


function me(req, res) {

  if (!req.session.user) {

    return res.json({
      connecte: false
    });

  }

  res.json({
    connecte: true,
    user: req.session.user
  });
}

export {
  login,
  logout,
  me
};
