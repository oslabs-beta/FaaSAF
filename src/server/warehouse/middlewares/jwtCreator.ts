import { Request, Response } from 'express';
import { encodeSession } from '../../services/jwt';
import { PartialSession } from '../../interfaces/IToken';

export default (req: Request, res: Response, next: (param?: unknown) => void): void | Response => {
  console.log(`Received ${req.method} request at 'jwtCreator' middleware`);
  const { username } = req.body, { userId } = res.locals;
  const partialSession: PartialSession = {
    id: userId,
    username: username
  };
  res.locals.jwt = encodeSession(process.env.JWT_ACCESS_SECRET, partialSession);
  console.log(`Success: JWT created: ${res.locals.jwt} for ${username}`);
  return next();
};
