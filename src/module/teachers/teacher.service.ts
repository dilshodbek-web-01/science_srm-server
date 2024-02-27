import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import type { Teachers } from "@prisma/client";
import { CreateTeacherRequest, DeleteTeacherRequest, UpdateTeacherRequest } from "./interfaces";

@Injectable()
export class TeachersService {
    readonly #_prisma: PrismaService

    constructor(prisma: PrismaService) {
        this.#_prisma = prisma
    }

    async createTeacher(body: CreateTeacherRequest): Promise<null> {
        await this.#_prisma.teachers.create({
            data: {
                teacher_name: body.teacher_name,
                teacher_phone: body.teacher_phone,
                teacher_address: body.teacher_address
            }
        })

        return null
    }

    async getAllTeachers(): Promise<Omit<Teachers, 'createdAt' | 'updatedAt' | 'deletedAt'>[]> {
        const teachers = await this.#_prisma.teachers.findMany({
            select: {
                id: true,
                teacher_name: true,
                teacher_phone: true,
                teacher_address: true
            }
        })

        return teachers;
    }

    async updateTeacher(body: UpdateTeacherRequest): Promise<null> {
        await this.#_checkTeacher(body.id)

        await this.#_prisma.teachers.update({
            data: {
                teacher_name: body.teacher_name,
                teacher_phone: body.teacher_phone,
                teacher_address: body.teacher_address,
            },
            where: {
                id: body.id
            }
        })

        return null
    }

    async deleteTeacher(param: DeleteTeacherRequest): Promise<null> {
        await this.#_checkTeacher(param.id)

        await this.#_prisma.teachers.delete({
            where: {
                id: param.id
            }
        })

        return null
    }

    async #_checkTeacher(id: string) {
        const teacher = await this.#_prisma.teachers.findFirst({
            where: {
                id
            },
            select: {
                id: true
            }
        })

        if (!teacher) {
            throw new NotFoundException('Teacher not found !')
        }
    }
}

