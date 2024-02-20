import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { StudentsService } from "./students.service";
import type { Students } from "@prisma/client";
import type { CreateStudentRequest, DeleteStudentRequest, GetOneStudentRequest, UpdateStudentRequest } from "./interfaces";

@Controller('/students')
export class StudentsController {
    readonly #_service: StudentsService

    constructor(service: StudentsService) {
        this.#_service = service
    }

    @Post('/create')
    createStudent(@Body() body: CreateStudentRequest): Promise<null> {
        return this.#_service.createStudent(body)
    }

    @Get('/read')
    getAllStudents(): Promise<Omit<Students, 'createdAt' | 'updatedAt' | 'deletedAt'>[]> {
        return this.#_service.getAllStudents()
    }

    @Get('/read/:id')
    getOneStudent(@Param() param: GetOneStudentRequest): Promise<Students> {
        return this.#_service.getOneStudent(param)
    }

    @Put('update/:id')
    updateStudent(@Body() body: UpdateStudentRequest): Promise<null> {
        return this.#_service.updateStudent(body)
    }

    @Delete('delete/:id')
    deleteStudent(@Param() param: DeleteStudentRequest): Promise<null> {
        return this.#_service.deleteStudent(param)
    }
}
