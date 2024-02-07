import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './config';
import { AuthModule, StudentsModule } from './module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DatabaseConfig],
      isGlobal: true
    }),
    AuthModule,
    StudentsModule
  ]
})
export class AppModule { }
