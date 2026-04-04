// Custom routing middleware example
export function customRouting(req, res, next) {
  // Example: Block access to /api/todos/user/42
  if (req.originalUrl === '/api/todos/user/42') {
    return res.status(403).json({
      success: false,
      message: 'Access to this user is forbidden by custom middleware.'
    });
  }
  // You can add more custom routing logic here
  next();
}
