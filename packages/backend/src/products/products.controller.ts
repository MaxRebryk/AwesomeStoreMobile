import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UseGuards,
	Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/create-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { Public } from '../decorators/public.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Public()
	@Get()
	findAll(
		@Query('name') name?: string,
		@Query('sort') sort?: 'asc' | 'desc',
		@Query('page') page?: number,
		@Query('limit') limit?: number,
	) {
		return this.productsService.findAll(name, sort, page, limit);
	}

	@Public()
	@Get(':uid')
	findOne(@Param('uid') uid: string) {
		return this.productsService.findOne(uid);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN)
	@Post()
	create(@Body() dto: CreateProductsDto) {
		return this.productsService.create(dto);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN)
	@Post('update/:uid')
	update(@Param('uid') uid: string, @Body() dto: UpdateProductsDto) {
		return this.productsService.update(uid, dto);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN)
	@Delete(':uid')
	delete(@Param('uid') uid: string) {
		return this.productsService.delete(uid);
	}
}
