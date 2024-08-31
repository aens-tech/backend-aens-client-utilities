import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  role: string;
}

const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    const refreshToken = req.cookies.refreshToken;

    if (!token || !refreshToken) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.userId = decoded.userId;
    req.userRole = decoded.role;

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token is required' });
      }

      try {
        const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JwtPayload;
        const newToken = jwt.sign({ userId: decodedRefreshToken.userId }, process.env.JWT_SECRET!, { expiresIn: '15m' });
        
        res.cookie('token', newToken, { httpOnly: true });
        req.userId = decodedRefreshToken.userId;
        req.userRole = decodedRefreshToken.role;

        next();
      } catch (refreshError) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
    } else {
      return res.status(403).json({ message: 'Invalid token' });
    }
  }
};

export default jwtMiddleware;
