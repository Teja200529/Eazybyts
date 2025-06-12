import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No authentication token, access denied' });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // `verified` will contain the payload like { id: ... }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token verification failed, authorization denied' });
  }
};
