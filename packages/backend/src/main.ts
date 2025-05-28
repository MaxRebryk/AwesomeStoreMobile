import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { RolesGuard } from './auth/guards/roles.guard';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: 'http://localhost:8081',
		credentials: true,
	});

	const reflector = app.get(Reflector);
	app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector));

	app.useGlobalPipes(new ValidationPipe());
	await app.listen(process.env.PORT ?? 3030, '0.0.0.0');
}
bootstrap();
