import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - Create', () => {

    let accessToken = ''

    beforeAll(async () => { 
        const email = 'create-cidade@gmail.com'
        const senha = '123abc'
        await testServer.post('/cadastrar').send({
            nome: 'Teste',
            email: email,
            senha: senha
        })

        const signInRes = await testServer.post('/entrar').send({ email, senha})

        accessToken = signInRes.body.accessToken
    })

    it('Tenta criar registro sem token de acesso', async () => {

        const res1 = await testServer
            .post('/cidades')
            .send({nome: 'Astorga'})

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(res1.body).toHaveProperty('errors.default')
    })

    it('Cria registro', async () => {

        const res1 = await testServer
            .post('/cidades')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({nome: 'Astorga'})

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res1.body).toEqual('number')
    })

    it('Tenta criar registro com nome de 2 caracteres', async () => {

        const res1 = await testServer
            .post('/cidades')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({nome: 'As'})

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.nome')
    })

    it('Tenta criar registro com nome de 1 caractere', async () => {

        const res1 = await testServer
            .post('/cidades')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({nome: 'A'})

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.nome')
    })

    it('Tenta criar registro vazio', async () => {

        const res1 = await testServer
            .post('/cidades')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({})

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.nome')
    })
})