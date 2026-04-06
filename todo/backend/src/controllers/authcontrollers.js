export const register = async (req, res) => {
  const { email, name, password } = req.body;

  //validate input
  if (!email || !name || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
};
