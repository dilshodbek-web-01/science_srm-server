import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
    providers: [AuthService, PrismaService],
    controllers: [AuthController]
})
export class AuthModule { }