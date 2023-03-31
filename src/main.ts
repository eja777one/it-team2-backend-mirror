import cookieParser from 'cookie-parser';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ErrorExceptionFilter, HttpExceptionFilter } from './exception-filter';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            stopAtFirstError: true,
            exceptionFactory: (errors) => {
                const errorsForResponse = [];

                errors.forEach((e) => {
                    //    errorsForResponse.push({ field: e.property });
                    const constrainsKeys = Object.keys(e.constraints);
                    constrainsKeys.forEach((cKey) => {
                        errorsForResponse.push({
                            message: e.constraints[cKey],
                            field: e.property,
                        });
                    });
                });
                throw new BadRequestException(errorsForResponse);
            },
        }),
    );
    app.useGlobalFilters(new ErrorExceptionFilter(), new HttpExceptionFilter());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Inctagram API')
        .setDescription('Powerfull team should use this api to develop the best Inctagramm app')
        .setVersion('02_week')
        .addTag('API')
        .build();

    const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('api', app, swaggerDoc );


    await app.listen(5000);
}
bootstrap();
