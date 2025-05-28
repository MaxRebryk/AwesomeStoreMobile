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
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { Roles } from '@/decorators/roles.decorator';

@Controller('payments')
export class PaymentController {
	constructor(private readonly paymentService: PaymentService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Body() createPaymentDto: CreatePaymentDto) {
		return this.paymentService.createPayment(createPaymentDto);
	}

	@UseGuards(JwtAuthGuard)
	@Roles('ADMIN')
	@Get()
	findAll() {
		return this.paymentService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.paymentService.findOne(id);
	}

	@UseGuards(JwtAuthGuard)
	@Get('order/:orderId')
	findByOrderId(@Param('orderId') orderId: string) {
		return this.paymentService.findByOrderId(orderId);
	}
}
