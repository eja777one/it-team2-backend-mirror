import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configNestApp } from './config.main';
import cookieParser from 'cookie-parser';
import { swaggerConfig, writeSwaggerFiles } from './config.swagger';

const options = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
    // allowedHeaders: 'Content-Type, Accept, Authorization',
};

async function bootstrap() {
    const baseApp = await NestFactory.create(AppModule);
    const app = configNestApp(baseApp);
    app.use(cookieParser());
    app.enableCors(options);

    const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('swagger', app, swaggerDoc);

    await app.listen(5000);

    // get the swagger json file (if app is running in development mode)
    if (process.env.NODE_ENV === 'development') writeSwaggerFiles();
}

bootstrap();
