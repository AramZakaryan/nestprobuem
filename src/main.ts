import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')

  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('nestprobuem')
    .setDescription('NestJS + TypeORM + mySQL')
    .setVersion('1.0')
    .addTag('nestprobuem')
    .setExternalDoc('Postman Collection', '/docs-json')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(3300)
}
bootstrap()
