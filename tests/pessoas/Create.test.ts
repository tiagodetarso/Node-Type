import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Pessoas - Create', () => {


    it('Cria registro', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'Fulano',
                sobrenome: 'De Tal',
                email: 'fulano@gmail.com',
                cidadeId: 16
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res1.body).toEqual('number')
    })

    it('Tenta criar registro sem nome', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                sobrenome: 'De Tal',
                email: 'fulano@gmail.com',
                cidadeId: 16
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.nome')
    })

    it('Tenta criar registro sem sobrenome', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'Fulano',
                email: 'fulano@gmail.com',
                cidadeId: 16
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
                cidadeId: 16
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
                email: 'fulano@gmail.com'
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
                email: 'fulano@gmail.com',
                cidadeId: 16
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
                email: 'fulano@gmail.com',
                cidadeId: 16
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
                cidadeId: 16
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.email')
    })

    it('Tenta criar registro com cidadeId sendo uma string', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'Fu',
                sobrenome: 'De Tal',
                email: 'fulano@gmail.com',
                cidadeId: 'Astorga'
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.cidadeId')
    })

    it('Tenta criar registro vazio', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({})

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body')
    })
})