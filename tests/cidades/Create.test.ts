import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - Create', () => {


    it('Cria registro', async () => {

        const res1 = await testServer
            .post('/cidades')
            .send({nome: 'Astorga'})

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res1.body).toEqual('number')
    })

    it('Tenta criar registro com nome de 2 caracteres', async () => {

        const res1 = await testServer
            .post('/cidades')
            .send({nome: 'As'})

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.nome')
    })

    it('Tenta criar registro com nome de 1 caractere', async () => {

        const res1 = await testServer
            .post('/cidades')
            .send({nome: 'A'})

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.nome')
    })

    it('Tenta criar registro vazio', async () => {

        const res1 = await testServer
            .post('/cidades')
            .send({})

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.nome')
    })
})