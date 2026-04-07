const sendValidationError = (res, message) =>
  res.status(400).json({
    success: false,
    message,
  });

export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return sendValidationError(res, "All fields are required");
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendValidationError(res, "All fields are required");
  }

  next();
}

