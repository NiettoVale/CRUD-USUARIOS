const { User } = require("../dataBase");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    console.log(users);
    if (users.length > 0) {
      return res.status(201).json(users);
    }

    return res.status(404).json({ error: "No hay usuarios cargados" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllUsers;
