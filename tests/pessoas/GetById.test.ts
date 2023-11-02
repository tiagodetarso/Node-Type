import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Pessoas - GetById', () => {

    let cidade: number | undefined = undefined
    let accessToken = ''

    beforeAll(async () => {
        const email = 'getbyid-pessoa@gmail.com'
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


    it('Tenta buscar registro por id sem autenticação', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({
                nome: 'Sóbrio',
                sobrenome: 'da Silva',
                email: 'sobrios@gmail.com',
                cidadeId: cidade
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resBuscada = await testServer
            .get(`/pessoas/${res1.body}`)
            
        expect(resBuscada.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(resBuscada.body).toHaveProperty('errors.default')
    })

    it('Busca registro por id', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({
                nome: 'Gérson',
                sobrenome: 'Arisco',
                email: 'gerisco@gmail.com',
                cidadeId: cidade
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resBuscada = await testServer
            .get(`/pessoas/${res1.body}`)
            .set({Authorization: `Bearer ${accessToken}`})
            .send()
            
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK)
        expect(resBuscada.body).toHaveProperty('nome')
    })

    it('Tenta buscar registro que não existe', async () => {

        const res1 = await testServer
            .get('/pessoas/99999')
            .set({Authorization: `Bearer ${accessToken}`})
            .send()
            
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })


    it('Tenta buscar registro com id = 0', async () => {
        
        const res1 = await testServer
            .get('/pessoas/0')
            .set({Authorization: `Bearer ${accessToken}`})
            .send()
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })
    
    it('Tenta buscar registro com id sendo uma string', async () => {
        
        const res1 = await testServer
            .get('/pessoas/a')
            .set({Authorization: `Bearer ${accessToken}`})
            .send()
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })
    
    it('Tenta buscar registro com id sendo um número não inteiro', async () => {
        
        const res1 = await testServer
            .get('/pessoas/1.1')
            .set({Authorization: `Bearer ${accessToken}`})
            .send()
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })
    
})