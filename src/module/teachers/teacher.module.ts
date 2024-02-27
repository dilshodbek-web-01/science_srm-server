import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { TeachersService } from "./teacher.service";
import { TeachersController } from "./teachers.controller";

@Module({
    providers: [TeachersService, PrismaService],
    controllers: [TeachersController]
})
export class TeachersModule { }