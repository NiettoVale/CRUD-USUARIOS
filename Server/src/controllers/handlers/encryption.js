const bcryptjs = require("bcryptjs");

const encrypt = async (textPlain) => {
  const hash = await bcryptjs.hash(textPlain, 10);
  return hash;
};

const compareHash = async (textPlain, hashText) => {
  return bcryptjs.compare(textPlain, hashText);
};

module.exports = {
  encrypt,
  compareHash,
};
