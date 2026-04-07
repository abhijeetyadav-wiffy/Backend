const sendValidationError = (res, message) =>
  res.status(400).json({
    success: false,
    message,
  });

export const validateCreateUser = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return sendValidationError(res, "Name is required");
  }

  next();
};

export const validateNameUserId = (req, res, next) => {
  const { title, user_id } = req.body;

  if (!title) {
    return sendValidationError(res, "Title is required");
  }
  if (!user_id) {
    return sendValidationError(res, "User ID is required");
  }
  next();
};

export const validateUpdateTodo = (req, res, next) => {
  const { title } = req.body;
  const { user_id, id } = req.params;

  if (!title) {
    return sendValidationError(res, "Title is required");
  }

  if (!user_id) {
    return sendValidationError(res, "User ID is required");
  }

  if (!id) {
    return sendValidationError(res, "Todo ID is required");
  }

  next();
};

export const validateDeleteTodo = (req, res, next) => {
  const { user_id, id } = req.params;

  if (!user_id) {
    return sendValidationError(res, "User ID is required");
  }

  if (!id) {
    return sendValidationError(res, "Todo ID is required");
  }

  next();
};

export const validateCompletedTodo = (req, res, next) => {
  const { completed } = req.body;
  const { user_id, id } = req.params;

  if (!user_id) {
    return sendValidationError(res, "User ID is required");
  }

  if (!id) {
    return sendValidationError(res, "Todo ID is required");
  }

  if (typeof completed !== "boolean") {
    return sendValidationError(res, "Completed must be a boolean");
  }

  next();
};
