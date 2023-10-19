import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - GetAll', () => {


    it('Busca todos sem especificações ', async () => {

        const res1 = await testServer
            .get('/cidades')
            
        expect(res1.statusCode).toEqual(StatusCodes.OK)
        expect(typeof res1.body).toEqual('string')
    })

    it('Busca todos com indicação de pagina', async () => {

        const res1 = await testServer
            .get('/cidades?page=2')

        expect(res1.statusCode).toEqual(StatusCodes.OK)
        expect(typeof res1.body).toEqual('string')
    })

    it('Busca todos com indicação de limite de registros por página', async () => {

        const res1 = await testServer
            .get('/cidades?limit=15')

        expect(res1.statusCode).toEqual(StatusCodes.OK)
        expect(typeof res1.body).toEqual('string')
    })

    it('Busca todos com indicação de filtro com três caracteres', async () => {

        const res1 = await testServer
            .get('/cidades?filter=Ast')

        expect(res1.statusCode).toEqual(StatusCodes.OK)
        expect(typeof res1.body).toEqual('string')
    })

    it('Busca todos com indicação de todos os parâmetros', async () => {

        const res1 = await testServer
            .get('/cidades?page=2&limit=20&filter=Ast')

        expect(res1.statusCode).toEqual(StatusCodes.OK)
        expect(typeof res1.body).toEqual('string')
    })

    it('Tenta buscar com página indicada por uma string', async () => {

        const res1 = await testServer
            .get('/cidades?page=A')

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.query.page')
    })

    it('Tenta buscar com limite por página indicada por uma string', async () => {

        const res1 = await testServer
            .get('/cidades?limit=A')

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.query.limit')
    })

    it('Tenta buscar com filter com menos de 2 caracteres', async () => {

        const res1 = await testServer
            .get('/cidades?filter=As')

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.query.filter')
    })

    it('Tenta buscar com todos os parâmetros fora das especificações', async () => {

        const res1 = await testServer
            .get('/cidades?page=a&limit=a&filter=As')

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.query.filter' && 'errors.query.limit' && 'errors.query.filter')
    })


})