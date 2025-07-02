import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { ResponseUtil } from '../utils/response';

export const validateRequest = (schema: { body?: AnyZodObject; query?: AnyZodObject; params?: AnyZodObject }) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }
      if (schema.query) {
        req.query = schema.query.parse(req.query);
      }
      if (schema.params) {
        req.params = schema.params.parse(req.params);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json(ResponseUtil.error('Validation error', error.errors));
        return;
      }
      next(error);
    }
  };
};
