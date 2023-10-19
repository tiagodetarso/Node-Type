import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - DeleteById', () => {


    it('Deleta registro', async () => {

        const res1 = await testServer
            .delete('/cidades/1')

        expect(res1.statusCode).toEqual(StatusCodes.OK)
        expect(typeof res1.body).toEqual('number')
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