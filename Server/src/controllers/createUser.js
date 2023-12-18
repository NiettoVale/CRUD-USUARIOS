const { User } = require("../dataBase");
const { encrypt } = require("./handlers/encryption");
const { validateName, validatePassword } = require("./handlers/validators");

const createUser = async (req, res) => {
  try {
    const { username, password, roles, permissions } = req.body;
    if (
      username === undefined ||
      username === "" ||
      password === undefined ||
      password === ""
    ) {
      return res
        .status(400)
        .json({ error: "No puede habar propiedades vacias" });
    }

    const errorsName = validateName(username);
    const errorsPassword = validatePassword(password);

    if (Object.keys(errorsName).length > 0) {
      return res.status(400).json({ error: errorsName });
    }

    if (Object.keys(errorsPassword).length > 0) {
      return res.status(400).json({ error: errorsPassword.passwordInvalid });
    }

    const hashPassword = await encrypt(password);

    await User.create({
      username,
      password: hashPassword,
      roles,
      permissions,
    });

    return res
      .status(201)
      .json({ message: "El usuario fue registrado con éxito!." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = createUser;
