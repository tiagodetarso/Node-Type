import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'


const router = Router()

router.get('/', (_, res) => {
    return res.send('Olá, Sr. Desenvolveloper!!! Seja bem-vindo(a)!!!')
}) 

router.get('/teste', (_, res) => {
    return res.send('Testando!')
}) 

router.post('/teste', (req, res) => {
    console.log(req.query)

    return res.status(StatusCodes.ACCEPTED).json(req.body)
}) 




export { router }