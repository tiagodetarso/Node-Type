import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

import { UsuariosProvider } from '../../database/providers/usuarios'
import { validation } from '../../shared/middlewares'
import { IUsuario } from '../../database/models'
import { PasswordCrypto } from '../../shared/services'


interface IBodyProps extends Omit<IUsuario, 'id' | 'nome'> { }


export const signInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().email().min(5),
        senha: yup.string().required().min(6)
    })),
}))


export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    const { email, senha } = req.body


    const result = await UsuariosProvider.getByEmail(email)
    if (result instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'E-mail ou senha inválidos'
            }
        })
    }

    const passwordMatch = await PasswordCrypto.verifyPassword(senha, result.senha)
    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'E-mail ou senha inválidos'
            }
        })
    } else {
        return res.status(StatusCodes.OK).json({ accessToken: 'teste.teste.teste'})
    }
}
