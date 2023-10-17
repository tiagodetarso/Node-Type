import { Router } from 'express'

import { CidadesController } from './../controllers'

const router = Router()

router.get('/', (_, res) => {
    return res.send('Olá, Sr. Desenvolveloper!!! Seja bem-vindo(a)!!!')
}) 

router.get('/cidades',CidadesController.getAllValidation,CidadesController.getAll)
router.get('/cidades/:id',CidadesController.getByIdValidation,CidadesController.getById)
router.put('/cidades/:id',CidadesController.updateByIdValidation,CidadesController.updateById)
router.delete('/cidades/:id',CidadesController.deleteByIdValidation,CidadesController.deleteById)
router.post('/cidades',CidadesController.createValidation,CidadesController.create)


export { router }