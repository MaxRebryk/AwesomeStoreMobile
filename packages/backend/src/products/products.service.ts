import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductsDto } from './dto/create-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
	constructor(private prisma: PrismaService) {}

	async create(dto: CreateProductsDto) {
		return this.prisma.products.create({
			data: dto,
		});
	}

	async findAll(name?: string, sort?: 'asc' | 'desc', page = 1, limit = 10) {
		const skip = (Number(page) - 1) * Number(limit);

		const where: Prisma.ProductsWhereInput = name
			? {
					name: {
						contains: name,
						mode: 'insensitive',
					},
				}
			: {};

		const orderBy: Prisma.ProductsOrderByWithRelationInput = sort
			? { price: sort }
			: {};

		const [items, total] = await Promise.all([
			this.prisma.products.findMany({
				where,
				orderBy,
				skip,
				take: Number(limit),
			}),
			this.prisma.products.count({
				where,
			}),
		]);

		return {
			items,
			total,
			page: Number(page),
			limit: Number(limit),
			totalPages: Math.ceil(total / Number(limit)),
		};
	}

	async findOne(uid: string) {
		const product = await this.prisma.products.findUnique({
			where: { uid },
		});
		if (!product) throw new NotFoundException('Products not found');
		return product;
	}

	async update(uid: string, dto: UpdateProductsDto) {
		try {
			return await this.prisma.products.update({
				where: { uid },
				data: dto,
			});
		} catch (error) {
			throw new NotFoundException(error);
		}
	}

	async delete(uid: string) {
		try {
			return await this.prisma.products.delete({
				where: { uid },
			});
		} catch (error) {
			throw new NotFoundException(error);
		}
	}
}
