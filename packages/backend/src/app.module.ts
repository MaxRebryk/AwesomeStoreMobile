import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './orderDetails/orderDetails.module';
import { PaymentModule } from './payment/payment.module';
import { EmailModule } from './email/email.module';

@Module({
	imports: [
		PrismaModule,
		UsersModule,
		AuthModule,
		ProductsModule,
		OrdersModule,
		OrderDetailsModule,
		PaymentModule,
		EmailModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
