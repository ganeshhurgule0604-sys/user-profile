import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),

    ThrottlerModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>[
        {
      ttl: configService.get<number>('THROTTLE_TTL', 60000),
      limit: configService.get<number>('THROTTLE_LIMIT', 100),
    },
  ],
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],

      useFactory:(configService:ConfigService)=>({
        type:'postgres',
        database:configService.get<string>('DATABASE'),
        username:configService.get<string>('USERNAME'),
        password:configService.get<string>('PASSWORD'),
        autoLoadEntities:true,
        synchronize:true    
      })
    })
    ,UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide:APP_GUARD,
      useClass:ThrottlerGuard
    }
  ],
})
export class AppModule {}
