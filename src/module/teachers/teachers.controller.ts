import { Body, Controller, Post, Get, Delete, Param, Put } from "@nestjs/common";
import { TeachersService } from "./teacher.service";
import type { Teachers } from "@prisma/client";
import type { CreateTeacherRequest, DeleteTeacherRequest, UpdateTeacherRequest } from "./interfaces";

@Controller('/teachers')
export class TeachersController {
    readonly #_service: TeachersService

    constructor(service: TeachersService) {
        this.#_service = service
    }

    @Post('/create')
    createTeacher(@Body() body: CreateTeacherRequest): Promise<null> {
        return this.#_service.createTeacher(body)
    }

    @Get('/read')
    getAllTeachers(): Promise<Omit<Teachers, 'createdAt' | 'updatedAt' | 'deletedAt'>[]> {
        return this.#_service.getAllTeachers()
    }

    @Put('/update/:id')
    updateTeacher(@Body() body: UpdateTeacherRequest): Promise<null> {
        return this.#_service.updateTeacher(body)
    }

    @Delete('/delete/:id')
    deleteTeacher(@Param() param: DeleteTeacherRequest): Promise<null> {
        return this.#_service.deleteTeacher(param)
    }
}