import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthError } from '../../errors/authError/index.js';
import { jwtConfig } from '../../config/jwt.js';
import { logger } from '../../utils/logger.js';

async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader === undefined || !authHeader.startsWith('Bearer ')) {
    throw new AuthError('No token provided', 'auth/missing-token');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, jwtConfig.secret) as jwt.JwtPayload;

    logger.info(`Token verified for user: id=${decodedToken.id}, email=${decodedToken.email}`);

    req.user = {
      id: decodedToken.id as number,
      email: decodedToken.email as string,
    };
    next();
  } catch (err) {
    logger.error(`Token verification failed: ${err}, token: ${token.slice(0, 10)}...`);

    throw new AuthError('Invalid or expired token', 'auth/invalid-token');
  }
}

export { authenticateToken };
