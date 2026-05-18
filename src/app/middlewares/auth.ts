import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import prisma from '../shared/prisma';

const auth = (...requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(401, 'You are not authorized!');
      }

      // Check if bearer token
      const bearerToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

      let decoded: JwtPayload;
      try {
        decoded = jwt.verify(bearerToken, config.jwt.access_secret) as JwtPayload;
      } catch (err) {
        throw new AppError(401, 'Unauthorized token!');
      }

      const { email, role } = decoded;

      // Check if user exists in db
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new AppError(404, 'This user is not found!');
      }

      // Role check (if role validation is passed in future, we support it)
      if (requiredRoles.length && !requiredRoles.includes(role)) {
        throw new AppError(403, 'You are forbidden to access this resource!');
      }

      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
