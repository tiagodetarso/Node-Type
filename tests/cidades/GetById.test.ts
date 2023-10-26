import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - GetById', () => {


    it('Busca registro por id', async () => {

        const res1 = await testServer
            .post('/cidades')
            .send({nome: 'Sabáudia'})

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resBuscada = await testServer
            .get(`/cidades/${res1.body}`)
            
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK)
        expect(resBuscada.body).toHaveProperty('nome')
    })

    it('Tenta buscar registro que não existe', async () => {

        const res1 = await testServer
            .get('/cidades/99999')
            .send()
            
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })


/*
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
    */
})