import { JwtSignOptions, JwtVerifyOptions } from "@nestjs/jwt"

export type GenerateTokenData = {
    payload: object,
    options?: JwtSignOptions
}

export type VerifyTokenData = {
    token: string,
    options?: JwtVerifyOptions
}