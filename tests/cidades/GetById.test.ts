import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - GetById', () => {

    let accessToken = ''

    beforeAll(async () => { 
        const email = 'getbyid-cidade@gmail.com'
        const senha = '123abc'
        await testServer.post('/cadastrar').send({
            nome: 'Teste',
            email: email,
            senha: senha
        })

        const signInRes = await testServer.post('/entrar').send({ email, senha})

        accessToken = signInRes.body.accessToken
    })


    it('Tenta buscar registro por id sem autenticação', async () => {

        const res1 = await testServer
            .post('/cidades')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({nome: 'Sabáudia'})

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resBuscada = await testServer
            .get(`/cidades/${res1.body}`)
            
        expect(resBuscada.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(resBuscada.body).toHaveProperty('errors.default')
    })

    it('Busca registro por id', async () => {

        const res1 = await testServer
            .post('/cidades')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({nome: 'Sabáudia'})

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resBuscada = await testServer
            .get(`/cidades/${res1.body}`)
            .set({Authorization: `Bearer ${accessToken}`})
            .send()
            
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK)
        expect(resBuscada.body).toHaveProperty('nome')
    })

    it('Tenta buscar registro que não existe', async () => {

        const res1 = await testServer
            .get('/cidades/99999')
            .set({Authorization: `Bearer ${accessToken}`})
            .send()
            
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })


    it('Tenta buscar registro com id = 0', async () => {

        const res1 = await testServer
            .get('/cidades/0')
            .set({Authorization: `Bearer ${accessToken}`})
            .send()

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })

    it('Tenta buscar registro com id sendo uma string', async () => {

        const res1 = await testServer
            .get('/cidades/a')
            .set({Authorization: `Bearer ${accessToken}`})
            .send()

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })

    it('Tenta buscar registro com id sendo um número não inteiro', async () => {

        const res1 = await testServer
            .get('/cidades/1.1')
            .set({Authorization: `Bearer ${accessToken}`})
            .send()

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })

})