const { User } = require("../dataBase");
const { encrypt } = require("./handlers/encryption");
const { validateName, validatePassword } = require("./handlers/validators");

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const errorsName = validateName(username);
    const errorsPassword = validatePassword(username);

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
    });

    return res
      .status(201)
      .json({ message: "El usuario fue registrado con éxito!." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = createUser;
