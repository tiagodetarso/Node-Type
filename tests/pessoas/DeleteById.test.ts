import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Pessoas - DeleteById', () => {


    it('Deleta registro', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'Cicrano',
                sobrenome: 'De Tal',
                email: 'cicrano@gmail.com',
                cidadeId: 94
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resApagada = await testServer
            .delete(`/pessoas/${res1.body}`)

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT)
    })

    it('Tenta deletar registro que não existe', async () => {

        const res1 = await testServer
            .delete('/pessoas/99999')

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })

    it('Tenta deletar registro com id do tipo string', async () => {

        const res1 = await testServer
            .delete('/pessoas/A')

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })

    it('Tenta deletar registro com id igual a zero', async () => {

        const res1 = await testServer
            .delete('/pessoas/0')

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })

    it('Tenta deletar registro com id igual a número não inteiro', async () => {

        const res1 = await testServer
            .delete('/pessoas/1.1')

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })
})