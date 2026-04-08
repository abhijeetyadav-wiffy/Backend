const sendValidationError = (res, message) =>
  res.status(400).json({
    success: false,
    message,
  });

export const validateNameUserId = (req, res, next) => {
  const { title } = req.body;

  if (!title || !String(title).trim()) {
    return sendValidationError(res, "Title is required");
  }

  req.body.title = String(title).trim();
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

export const requireSelfUser = (req, res, next) => {
  const routeUserId = Number(req.params.user_id);
  const loggedInUserId = Number(req.user.id);

  if (!Number.isInteger(routeUserId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid user id",
    });
  }

  if (routeUserId !== loggedInUserId) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to perform this action",
    });
  }

  next();
};
