const { User } = require("../dataBase");

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.update({ deleted: true }, { where: { userId } });

    return res.status(200).json({ message: "Usuario eliminado con exito!!!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = deleteUser;
