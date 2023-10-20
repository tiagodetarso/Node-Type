import { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { StatusCodes } from 'http-status-codes'

interface IQueryProps {
    page?: yup.Maybe<number | undefined>
    limit?: yup.Maybe<number | undefined>
    filter?: yup.Maybe<string | undefined>
}

const querySchema = yup.object().shape({
    page: yup.number().notRequired().moreThan(0).integer(),
    limit: yup.number().notRequired().moreThan(0).integer(),
    filter: yup.string().notRequired().min(3),
})

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(querySchema),
}))

export const getAll = async (req: Request<{},{},{}, IQueryProps>, res: Response) => {

    res.setHeader('acess-control-expose-headers', 'x-total-count')
    res.setHeader('x-total-count', 1)

    return res.status(StatusCodes.OK).json([
        {
            id: 1,
            nome: 'Astorga'
        }
    ])
}