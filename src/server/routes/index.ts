import { Router } from 'express'

import { CidadesController } from './../controllers'

const router = Router()

router.get('/', (_, res) => {
    return res.send('Olá, Sr. Desenvolveloper!!! Seja bem-vindo(a)!!!')
}) 

router.post('/cidades',CidadesController.createValidation,CidadesController.create)


export { router }