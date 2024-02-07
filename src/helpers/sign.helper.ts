import * as jwt from 'jsonwebtoken'

export const sign = (payload: object): string => jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '1d'
})

export const verify = (payload: string): string => JSON.stringify(jwt.verify(payload, process.env.SECRET_KEY))
