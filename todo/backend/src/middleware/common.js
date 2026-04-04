// Simple logger middleware example
export function logger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
}

// Example authentication middleware 
export function authenticate(req, res, next) {
  //  authentication logic here
  // For now, just call next()
  next();
}
