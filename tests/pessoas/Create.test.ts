import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Pessoas - Create', () => {
    let cidade: number | undefined = undefined
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({ nome: 'Teste'})

        cidade = resCidade.body
    })

    it('Cria registro', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'Fulano',
                sobrenome: 'De Tal',
                email: 'fulano@gmail.com',
                cidadeId: cidade
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res1.body).toEqual('number')
    })

    it('Tenta criar registro com email duplicado', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'Fulaninho',
                sobrenome: 'Malandro',
                email: 'fulaninho@gmail.com',
                cidadeId: cidade
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res1.body).toEqual('number')

        const res2 = await testServer
            .post('/pessoas')
            .send({
                nome: 'Cicraninho',
                sobrenome: 'Jiraia',
                email: 'fulaninho@gmail.com',
                cidadeId: cidade
            })
        
        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res2.body).toHaveProperty('errors.default')
    })

    it('Tenta criar registro sem nome', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                sobrenome: 'De Tal',
                email: 'fulano02@gmail.com',
                cidadeId: cidade
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.nome')
    })

    it('Tenta criar registro sem sobrenome', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'Fulano',
                email: 'fulano01@gmail.com',
                cidadeId: cidade
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.sobrenome')
    })

    it('Tenta criar registro sem email', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'Fulano',
                sobrenome: 'de Tal',
                cidadeId: cidade
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.email')
    })

    it('Tenta criar registro sem cidadeId', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'Fulano',
                sobrenome: 'de Tal',
                email: 'fulano00@gmail.com'
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.cidadeId')
    })

    it('Tenta criar registro com nome de menos de 3 caracteres', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'Fu',
                sobrenome: 'De Tal',
                email: 'fulano03@gmail.com',
                cidadeId: cidade
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.nome')
    })

    it('Tenta criar registro com sobrenome de menos de 3 caracteres', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'Fulano',
                sobrenome: 'De',
                email: 'fulano04@gmail.com',
                cidadeId: cidade
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.sobrenome')
    })

    it('Tenta criar registro com email sem formato de e-mail', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'Fulano',
                sobrenome: 'De Tal',
                email: 'fulano.gmail.com',
                cidadeId: cidade
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.email')
    })

    it('Tenta criar registro com cidadeId sendo uma string', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'Fula',
                sobrenome: 'De Tal',
                email: 'fulano05@gmail.com',
                cidadeId: 'Astorga'
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.cidadeId')
    })

    it('Tenta criar registro com cidadeId não existente no banco', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'Fula',
                sobrenome: 'De Tal',
                email: 'fulano06@gmail.com',
                cidadeId: 9999
            })

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })

    it('Tenta criar registro vazio', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({})

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.nome')
        expect(res1.body).toHaveProperty('errors.body.sobrenome')
        expect(res1.body).toHaveProperty('errors.body.email')
        expect(res1.body).toHaveProperty('errors.body.cidadeId')
    })
})