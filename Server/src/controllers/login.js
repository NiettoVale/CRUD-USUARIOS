const { User } = require("../dataBase");
const { compareHash } = require("./handlers/encryption");
const { validateName } = require("./handlers/validators");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const errorName = validateName(username);

    if (password.length < 8 || password.length > 20) {
      return res
        .status(400)
        .json({ error: "La contraseña debe tener entre 8 y 20 carácteres." });
    }
    if (errorName.length > 0) {
      return res.status(400).json({ error: errorName });
    }

    const userFound = await User.findOne({ where: { username } });

    if (!userFound) {
      return res
        .status(404)
        .json({ error: "El nombre de usuario es incorrecto o no existe." });
    }

    const enabled = await compareHash(password, userFound.password);

    if (enabled) {
      return res.status(200).json({ message: "Inicio de sesión exitoso." });
    }

    return res.status(400).json({ error: "La contraseña es incorreacta." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = login;
