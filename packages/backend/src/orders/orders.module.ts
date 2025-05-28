import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '@/prisma/prisma.service';
import { IsExistMiddleware } from '@/middlewares/isExist.middleware';

@Module({
	imports: [PrismaModule],
	controllers: [OrdersController],
	providers: [OrdersService],
	exports: [OrdersService],
})
export class OrdersModule implements NestModule {
	constructor(private readonly prisma: PrismaService) {}

	configure(consumer: MiddlewareConsumer) {
		const middleware = new IsExistMiddleware(this.prisma);
		consumer
			.apply(middleware.use.bind(middleware))
			.forRoutes(
				{ path: 'orders', method: RequestMethod.GET },
				{ path: 'orders/:orderId', method: RequestMethod.GET },
				{ path: 'orders/update/:orderId', method: RequestMethod.POST },
				{ path: 'orders/:orderId', method: RequestMethod.DELETE },
			);
	}
}
