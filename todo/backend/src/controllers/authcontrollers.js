export const register = async (req, res) => {
  const { email, name, password } = req.body
  try {
    const user = await prisma.users.create({
        data:{
            name,
            email,
            password
        }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
