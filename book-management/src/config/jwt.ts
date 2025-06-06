import jwt from 'jsonwebtoken';

const jwtConfig = {
  secret: process.env.JWT_SECRET! as jwt.Secret,
  expiresIn: process.env.JWT_EXPIRES_IN || '1h',
};

export { jwtConfig };
