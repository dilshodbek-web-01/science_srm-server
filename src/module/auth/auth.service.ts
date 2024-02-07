import type { Users } from "@prisma/client";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { sign, verify } from "src/helpers";
import type { SignInRequest, SignInResponse, SignOutRequest, SignUpRequest, SignUpResponse } from "./interfaces";

@Injectable()
export class AuthService {
    readonly #_prisma: PrismaService

    constructor(prisma: PrismaService) {
        this.#_prisma = prisma
    }

    async signUp(body: SignUpRequest): Promise<SignUpResponse> {
        await this.#__checkExistingUser({ username: body.username })

        const newUser = await this.#_prisma.users.create({
            data: {
                username: body.username,
                password: body.password,
                email: body.email,
                deletedAt: null,
            },
            select: {
                id: true
            }
        })

        return {
            token: sign({ id: newUser.id })
        }
    }

    async signIn(body: SignInRequest): Promise<SignInResponse> {
        const foundUser = await this.#_checkUser({ username: body.username, password: body.password })

        return {
            token: sign({ id: foundUser.id })
        }

    }

    async signOut(headers: SignOutRequest): Promise<null> {
        const userID = JSON.parse(verify(headers.refreshtoken)).id

        await this.#_checkUserId(userID)

        await this.#_prisma.users.delete({
            where: {
                id: userID
            }
        })

        return null
    }

    async #__checkExistingUser(body: { username: string }): Promise<void> {
        const findUser = await this.#_prisma.users.findFirst({
            where: {
                username: body.username,
                deletedAt: null
            },
            select: {
                id: true
            }
        })

        if (findUser) {
            throw new ConflictException("User already exists")
        }

    }

    async #_checkUser(body: { username: string, password: string }): Promise<Pick<Users, 'id'>> {
        const foundUser = await this.#_prisma.users.findFirst({
            where: {
                username: body.username,
                password: body.password,
                deletedAt: null
            },
            select: {
                id: true
            }
        })

        if (!foundUser) {
            throw new NotFoundException("User not found !")
        }

        return {
            id: foundUser.id
        }
    }

    async #_checkUserId(id: string): Promise<Pick<Users, 'id'>> {
        const foundUser = await this.#_prisma.users.findFirst({
            where: {
                id: id,
                deletedAt: null
            }
        })

        if (!foundUser) {
            throw new NotFoundException('User not found !')
        }

        return foundUser
    }
}