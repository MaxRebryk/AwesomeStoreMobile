import {
	Module,
	NestModule,
	MiddlewareConsumer,
	RequestMethod,
} from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { IsExistMiddleware } from '../middlewares/isExist.middleware';
import { PrismaService } from '../prisma/prisma.service';

@Module({
	imports: [PrismaModule],
	controllers: [ProductsController],
	providers: [ProductsService],
	exports: [ProductsService],
})
export class ProductsModule implements NestModule {
	constructor(private readonly prisma: PrismaService) {}

	configure(consumer: MiddlewareConsumer) {
		const middleware = new IsExistMiddleware(this.prisma, 'inStock');
		consumer
			.apply(middleware.use.bind(middleware))
			.forRoutes(
				{ path: 'products', method: RequestMethod.GET },
				{ path: 'products/:uid', method: RequestMethod.GET },
			);
	}
}
