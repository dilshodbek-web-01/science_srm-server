import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import type { Students } from "@prisma/client";
import type { CreateStudentRequest, DeleteStudentRequest, GetOneStudentRequest, UpdateStudentRequest } from "./interfaces";

@Injectable()
export class StudentsService {
    readonly #_prisma: PrismaService

    constructor(prisma: PrismaService) {
        this.#_prisma = prisma
    }

    async createStudent(body: CreateStudentRequest): Promise<null> {
        await this.#_prisma.students.create({
            data: {
                student_name: body.student_name,
                student_phone: body.student_phone,
                student_group: body.student_group,
                parent_name: body.parent_name,
                parent_phone: body.parent_phone,
                teacher_name: body.teacher_name
            }
        })

        return null
    }

    async getAllStudents(): Promise<Omit<Students, 'createdAt' | 'updatedAt' | 'deletedAt'>[]> {
        const students = await this.#_prisma.students.findMany({
            select: {
                id: true,
                student_name: true,
                student_phone: true,
                student_group: true,
                parent_name: true,
                parent_phone: true,
                teacher_name: true
            }
        })

        return students;
    }

    async getOneStudent(param: GetOneStudentRequest): Promise<Students> {
        await this.#_checkStudent(param.id)

        const foundStudent = await this.#_prisma.students.findFirst({
            where: {
                id: param.id
            }
        })

        return foundStudent
    }

    async updateStudent(body: UpdateStudentRequest): Promise<null> {
        await this.#_checkStudent(body.id)

        await this.#_prisma.students.update({
            data: {
                student_name: body.student_name,
                student_phone: body.student_phone,
                student_group: body.student_group,
                parent_name: body.parent_name,
                parent_phone: body.parent_phone,
                teacher_name: body.teacher_name
            },
            where: {
                id: body.id
            }
        })

        return null
    }

    async deleteStudent(param: DeleteStudentRequest): Promise<null> {
        await this.#_checkStudent(param.id)

        await this.#_prisma.students.delete({
            where: {
                id: param.id
            }
        })

        return null
    }

    async #_checkStudent(id: string) {
        const student = await this.#_prisma.students.findFirst({
            where: {
                id
            },
            select: {
                id: true
            }
        })

        if (!student) {
            throw new NotFoundException('Student not found !')
        }
    }
}