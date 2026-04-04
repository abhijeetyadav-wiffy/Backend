import {body} from 'express-validator'

export const validateNameUserId = (req, res, next) => {
    const { title, user_id } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }
    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    next();
  }