const { User } = require("../dataBase");
const { encrypt } = require("./handlers/encryption");
const { validateName, validatePassword } = require("./handlers/validators");

const userFound = async (req, res) => {
  try {
    const { username, password, deleted } = req.body;
    const { userId } = req.params;

    const userFound = User.findByPk(userId);

    if (userFound) {
      if (
        username !== "" ||
        (undefined && password !== "") ||
        (password !== undefined && deleted !== "") ||
        deleted !== undefined
      ) {
        const errorsName = validateName(username);
        const errorsPassword = validatePassword(username);

        if (Object.keys(errorsName).length > 0) {
          return res.status(400).json({ error: errorsName });
        }

        if (Object.keys(errorsPassword).length > 0) {
          return res
            .status(400)
            .json({ error: errorsPassword.passwordInvalid });
        }

        const hashPassword = await encrypt(password);
        userFound.username = username;
        userFound.password = hashPassword;

        if (userFound.changed()) {
          await userFound.save();
          return res
            .status(200)
            .json({ message: "Usuario actualizado con exito" });
        }
        return res
          .status(200)
          .json({ message: "No hubo cambios para actualizar" });
      }
    }

    return res.status(404).json({ error: "El usuario no existe!." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = userFound;
