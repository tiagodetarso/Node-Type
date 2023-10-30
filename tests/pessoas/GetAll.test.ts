import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Pessoas - GetAll', () => {


    it('Busca todos sem especificações', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'Eriberto',
                sobrenome: 'Tigre',
                email: 'tigrao@erimail.com.br',
                cidadeId:94
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resBuscada = await testServer
            .get('/pessoas')
            .send()

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0)
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK)
        expect(resBuscada.body.length).toBeGreaterThan(0)
    })

    it('Tenta buscar com página indicada por uma string', async () => {
        
        const res1 = await testServer
            .get('/pessoas?page=A')
            .send()
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.query.page')
    })
    
    it('Tenta buscar com limite por página indicada por uma string', async () => {
        
        const res1 = await testServer
            .get('/pessoas?limit=A')
            .send()
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.query.limit')
    })
    
    it('Tenta buscar com filter com menos de 2 caracteres', async () => {
        
        const res1 = await testServer
            .get('/pessoas?filter=As')
            .send()
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.query.filter')
    })
    
})