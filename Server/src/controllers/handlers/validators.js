const validateName = (name) => {
  const errors = {};
  const lowercaseRegex = /^[a-z]+$/;

  if (name.length < 3 || name.length > 15) {
    errors.errorLength = "El nombre debe tener entre 3 y 15 caracteres.";
  }

  if (!lowercaseRegex.test(name)) {
    errors.errorFormat = "El nombre solo debe contener letras minúsculas.";
  }

  return errors;
};

const validatePassword = (password) => {
  console.log(password);
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  const errors = {};

  if (!regex.test(password)) {
    errors.passwordInvalid = `
La contraseña no cumple con los requisitos de seguridad. Asegúrate de que tu contraseña cumpla con las pautas mencionadas.
- Debe comenzar con al menos una letra minúscula.
- Debe incluir al menos una letra mayúscula.
- Debe contener al menos un dígito (número).
- Debe tener al menos un carácter especial de la lista @$!%*?&.
- Puede contener caracteres alfabéticos (mayúsculas y minúsculas), dígitos y los caracteres especiales especificados.
- La longitud mínima de la contraseña es de 8 caracteres.
- La longitud máxima de la contraseña es de 20 caracteres.`;
  }

  return errors;
};

module.exports = { validateName, validatePassword };
