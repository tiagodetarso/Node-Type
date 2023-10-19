import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - GetById', () => {


    it('Busca registro por id', async () => {

        const res1 = await testServer
            .get('/cidades/1')
            
        expect(res1.statusCode).toEqual(StatusCodes.OK)
        expect(typeof res1.body).toEqual('number')
    })

    it('Tenta buscar registro com id = 0', async () => {

        const res1 = await testServer
            .get('/cidades/0')

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })

    it('Tenta buscar registro com id sendo uma string', async () => {

        const res1 = await testServer
            .get('/cidades/a')

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })

    it('Tenta buscar registro com id sendo um número não inteiro', async () => {

        const res1 = await testServer
            .get('/cidades/1.1')

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })

})