import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(
    session({
      secret: 'very-important-secret', // 내부적으로 암호화에 쓰이는 키
      resave: false, // 세션 항상 저장할지 여부
      saveUninitialized: false, // 세션 저장 전 빈 값 저장할지 여부
      cookie: { maxAge: 3_600_000 }, // 유효시간 1시간
    }),
  );
  app.use(passport.initialize()); // 패스포트 초기화
  app.use(passport.session()); // 세션 저장소 초기화
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
