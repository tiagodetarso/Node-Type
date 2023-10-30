import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - GetAll', () => {

    it('Busca todos sem especificações', async () => {

        const res1 = await testServer
            .post('/cidades')
            .send({nome: 'Iguaraçu'})

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resBuscada = await testServer
            .get('/cidades')
            .send()

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0)
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK)
        expect(resBuscada.body.length).toBeGreaterThan(0)
    })
 
    it('Tenta buscar com página indicada por uma string', async () => {
        
        const res1 = await testServer
            .get('/cidades?page=A')
            .send()
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.query.page')
    })
    
    it('Tenta buscar com limite por página indicada por uma string', async () => {

        const res1 = await testServer
            .get('/cidades?limit=A')
            .send()
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.query.limit')
    })
    
    it('Tenta buscar com filter com menos de 2 caracteres', async () => {
        
        const res1 = await testServer
            .get('/cidades?filter=As')
            .send()
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.query.filter')
    })
    
})