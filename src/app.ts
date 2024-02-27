import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './config';
import { AuthModule, StudentsModule, TeachersModule } from './module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DatabaseConfig],
      isGlobal: true
    }),
    AuthModule,
    StudentsModule,
    TeachersModule
  ]
})
export class AppModule { }
