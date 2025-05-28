import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { OrderDetailsService } from './orderDetails.service';
import { OrderDetailsController } from './orderDetails.controller';

@Module({
	imports: [PrismaModule],
	controllers: [OrderDetailsController],
	providers: [OrderDetailsService],
	exports: [OrderDetailsService],
})
export class OrderDetailsModule {}
