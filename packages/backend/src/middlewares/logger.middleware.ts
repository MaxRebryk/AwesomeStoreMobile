import { Injectable, NestMiddleware } from '@nestjs/common';
import pino from 'pino';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	private readonly logger = pino();

	use(req: Request, res: Response, next: NextFunction) {
		this.logger.info({
			method: req.method,
			url: req.originalUrl,
			query: req.query,
			body: req.body,
		});

		next();
	}
}
