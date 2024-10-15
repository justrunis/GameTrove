const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const validateUsername = (username) => {
  return username.length >= 3;
};

const validatePasswordRepeat = (password, passwordRepeat) => {
  return password === passwordRepeat;
};

export const validateRegistrationForm = (formData) => {
  const { username, email, password, confirmPassword } = formData;
  const errors = {};

  if (!username) errors.username = "Username is required.";
  else if (!validateUsername(username))
    errors.username = "Username must be at least 3 characters long.";

  if (!email) errors.email = "Email is required.";
  else if (!validateEmail(email)) errors.email = "Invalid email address.";

  if (!password) errors.password = "Password is required.";
  else if (!validatePassword(password))
    errors.password = "Password must be at least 6 characters long.";

  if (!confirmPassword)
    errors.confirmPassword = "Please confirm your password.";
  else if (password !== confirmPassword)
    errors.confirmPassword = "Passwords do not match.";

  return Object.keys(errors).length ? errors : null; // Return errors object or null if valid
};

export const validateLoginForm = (formData) => {
  const { email, password } = formData;
  const errors = {};

  if (!email) errors.email = "Email is required.";
  else if (!validateEmail(email)) errors.email = "Invalid email address.";

  if (!password) errors.password = "Password is required.";
  else if (!validatePassword(password))
    errors.password = "Password must be at least 6 characters long.";

  return errors; // Return errors object with error messages
};

export const validateForgotPasswordForm = (formData) => {
  if (!validateEmail(formData.email)) {
    return "Invalid email address.";
  }

  return null; // Return null if the form data is valid
};

export const validateResetPasswordForm = (formData) => {
  if (!validatePassword(formData.password)) {
    return "Invalid password. Password must be at least 6 characters long.";
  }

  if (!validatePasswordRepeat(formData.password, formData.confirmPassword)) {
    return "Passwords do not match.";
  }

  return null; // Return null if the form data is valid
};
