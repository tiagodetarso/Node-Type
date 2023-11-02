import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Pessoas - GetAll', () => {

    let cidade: number | undefined = undefined
    let accessToken = ''

    beforeAll(async () => {
        const email = 'getall-pessoa@gmail.com'
        const senha = '123abc'
        await testServer.post('/cadastrar').send({
            nome: 'Teste',
            email: email,
            senha: senha
        })

        const signInRes = await testServer.post('/entrar').send({ email, senha})

        accessToken = signInRes.body.accessToken
    })

    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Teste'})

        cidade = resCidade.body
    })


    it('Tenta buscar todos os registros sem autenticação', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({
                nome: 'Eriberto',
                sobrenome: 'Tigre',
                email: 'tigrao@erimail.com.br',
                cidadeId: cidade
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resBuscada = await testServer
            .get('/pessoas')
            .send()

        expect(resBuscada.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(resBuscada.body).toHaveProperty('errors.default')
    })

    it('Busca todos sem especificações', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({
                nome: 'Alberto',
                sobrenome: 'Fofuchão',
                email: 'alfof@erimail.com.br',
                cidadeId: cidade
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resBuscada = await testServer
            .get('/pessoas')
            .set({Authorization: `Bearer ${accessToken}`})
            .send()

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0)
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK)
        expect(resBuscada.body.length).toBeGreaterThan(0)
    })

    it('Tenta buscar com página indicada por uma string', async () => {
        
        const res1 = await testServer
            .get('/pessoas?page=A')
            .set({Authorization: `Bearer ${accessToken}`})
            .send()
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.query.page')
    })
    
    it('Tenta buscar com limite por página indicada por uma string', async () => {
        
        const res1 = await testServer
            .get('/pessoas?limit=A')
            .set({Authorization: `Bearer ${accessToken}`})
            .send()
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.query.limit')
    })
    
    it('Tenta buscar com filter com menos de 2 caracteres', async () => {
        
        const res1 = await testServer
            .get('/pessoas?filter=As')
            .set({Authorization: `Bearer ${accessToken}`})
            .send()
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.query.filter')
    })
    
})