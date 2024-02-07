import { Body, Controller, Headers, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { SignInRequest, SignInResponse, SignOutRequest, SignUpRequest, SignUpResponse } from "./interfaces";

@Controller('/auth')
export class AuthController {
    readonly #_service: AuthService

    constructor(service: AuthService) {
        this.#_service = service
    }

    @Post('/sign-up')
    singUp(@Body() body: SignUpRequest): Promise<SignUpResponse> {
        return this.#_service.signUp(body)
    }

    @Post('/sign-in')
    singIn(@Body() body: SignInRequest): Promise<SignInResponse> {
        return this.#_service.signIn(body)
    }

    @Post('/sign-out')
    singOut(@Headers() headers: SignOutRequest): Promise<null> {
        return this.#_service.signOut(headers)
    }
}