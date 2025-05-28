import {
	Injectable,
	NestMiddleware,
	NotFoundException,
	BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

type PrismaModel = {
	findUnique: (args: {
		where: { uid: string };
	}) => Promise<Record<string, string | number | boolean | null> | null>;
	findMany: (args?: {
		where?: Record<string, unknown>;
	}) => Promise<Record<string, string | number | boolean | null>[]>;
};

@Injectable()
export class IsExistMiddleware implements NestMiddleware {
	constructor(
		private readonly prisma: PrismaService,
		private readonly quantityField?: string,
	) {}

	async use(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id } = req.params;
		const entity = req.path.split('/')[1];

		const model = this.prisma[
			entity as keyof PrismaClient
		] as unknown as PrismaModel;

		if (!model) {
			throw new NotFoundException(`Entity "${entity}" not found`);
		}

		if (!('findUnique' in model)) {
			throw new NotFoundException(
				`findUnique method does not exist for "${entity}"`,
			);
		}

		if (!id) {
			const records = await model.findMany();
			if (this.quantityField) {
				const outOfStock = records.some(
					(record) =>
						this.quantityField &&
						this.quantityField in record &&
						typeof record[this.quantityField] === 'number' &&
						(record[this.quantityField] as number) <= 0,
				);
				if (outOfStock) {
					throw new BadRequestException(
						'Some products are out of stock',
					);
				}
			}
			next();
			return;
		}

		const record = await model.findUnique({
			where: { uid: id },
		});

		if (!record) {
			throw new NotFoundException(`Resource with id ${id} not found`);
		}

		if (
			this.quantityField &&
			this.quantityField in record &&
			typeof record[this.quantityField] === 'number' &&
			(record[this.quantityField] as number) <= 0
		) {
			throw new BadRequestException(
				`${entity} with id "${id}" is out of stock`,
			);
		}

		next();
	}
}
