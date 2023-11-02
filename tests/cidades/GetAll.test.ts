import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - GetAll', () => {

    let accessToken = ''

    beforeAll(async () => { 
        const email = 'getall-cidade@gmail.com'
        const senha = '123abc'
        await testServer.post('/cadastrar').send({
            nome: 'Teste',
            email: email,
            senha: senha
        })

        const signInRes = await testServer.post('/entrar').send({ email, senha})

        accessToken = signInRes.body.accessToken
    })

    it('Tenta buscar registros sem autenticação', async () => {

        const res1 = await testServer
            .post('/cidades')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({nome: 'Iguaraçu'})

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resBuscada = await testServer
            .get('/cidades')
            .send()

        expect(resBuscada.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(resBuscada.body).toHaveProperty('errors.default')
    })


    it('Busca todos sem especificações', async () => {

        const res1 = await testServer
            .post('/cidades')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({nome: 'Iguaraçu'})

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resBuscada = await testServer
            .get('/cidades')
            .set({Authorization: `Bearer ${accessToken}`})
            .send()

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0)
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK)
        expect(resBuscada.body.length).toBeGreaterThan(0)
    })
 
    it('Tenta buscar com página indicada por uma string', async () => {
        
        const res1 = await testServer
            .get('/cidades?page=A')
            .set({Authorization: `Bearer ${accessToken}`})
            .send()
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.query.page')
    })
    
    it('Tenta buscar com limite por página indicada por uma string', async () => {

        const res1 = await testServer
            .get('/cidades?limit=A')
            .set({Authorization: `Bearer ${accessToken}`})
            .send()
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.query.limit')
    })
    
    it('Tenta buscar com filter com menos de 2 caracteres', async () => {
        
        const res1 = await testServer
            .get('/cidades?filter=As')
            .set({Authorization: `Bearer ${accessToken}`})
            .send()
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.query.filter')
    })
    
})