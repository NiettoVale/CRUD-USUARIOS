const { User } = require("../dataBase");
const { encrypt } = require("./handlers/encryption");
const { validateName, validatePassword } = require("./handlers/validators");

const userFound = async (req, res) => {
  try {
    const { username, password, deleted } = req.body;
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "El usuario no existe." });
    }

    // Validar que se proporcionen datos para actualizar
    if (
      username === undefined &&
      password === undefined &&
      deleted === undefined
    ) {
      return res
        .status(400)
        .json({ error: "Se requieren datos para actualizar." });
    }

    // Validar nombre de usuario si se proporciona
    if (username !== undefined) {
      const errorsName = validateName(username);
      if (Object.keys(errorsName).length > 0) {
        return res.status(400).json({ error: errorsName });
      }
      user.username = username;
    }

    // Validar contraseña si se proporciona
    if (password !== undefined) {
      const errorsPassword = validatePassword(password);
      if (Object.keys(errorsPassword).length > 0) {
        return res.status(400).json({ error: errorsPassword.passwordInvalid });
      }
      const hashPassword = await encrypt(password);
      user.password = hashPassword;
    }

    // Actualizar la propiedad 'deleted' si se proporciona
    if (deleted !== undefined) {
      user.deleted = deleted;
    }

    // Guardar los cambios
    await user.save();

    return res.status(200).json({ message: "Usuario actualizado con éxito." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = userFound;
