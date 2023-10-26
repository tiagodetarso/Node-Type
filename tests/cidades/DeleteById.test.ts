import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - DeleteById', () => {


    it('Deleta registro', async () => {

        const res1 = await testServer
            .post('/cidades')
            .send({nome: 'Astorga'})
        
        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resApagada = await testServer
            .delete(`/cidades/${res1.body}`)

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT)
    })

    it('Tenta deletar registro que não existe', async () => {

        const res1 = await testServer
            .delete('/cidades/99999')

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })

    it('Tenta deletar registro com id do tipo string', async () => {

        const res1 = await testServer
            .delete('/cidades/A')

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })

    it('Tenta deletar registro com id igual a zero', async () => {

        const res1 = await testServer
            .delete('/cidades/0')

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })

    it('Tenta deletar registro com id igual a número não inteiro', async () => {

        const res1 = await testServer
            .delete('/cidades/1.1')

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })
})