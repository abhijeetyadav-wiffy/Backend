export const getTodos = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Get Todos",
    });
  } catch (error) {
    res.status(500).json({ erro: "Internal Server Error" });
  }
};

export const createTodos = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }
    res.status(201).json({
      success: true,
      message: "Todo created",
      data: { title },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    res.status(201).json({
      success: true,
      message: "Todo created",
      data: { title },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }
    res.status(200).json({
      success: true,
      message: `todo updated ${id}`,
      data: { title },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteTodos = async (req, res) => {
  try {
    const { id } = req.params;

    res.status(200).json({
      success: true,
      message: `Deleted todo ${id}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
