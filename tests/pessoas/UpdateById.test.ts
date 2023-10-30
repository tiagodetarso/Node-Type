import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Pessoas - UpdateById', () => {


    it('Atualiza registro', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'Abcd',
                sobrenome: 'da Silva',
                email: 'abcd@gmail.com',
                cidadeId: 16
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .send({
                nome: 'Abcde',
                sobrenome: 'dos Santos',
                email: 'abcde@gmail.com',
                cidadeId: 94
            })

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT)
    })

    it('Tenta atualizar registro que não existe', async () => {

        const res1 = await testServer
            .put('/pessoas/99999')
            .send({
                nome: 'Abcde',
                sobrenome: 'dos Santos',
                email: 'abcde@gmail.com',
                cidadeId: 94
            })
            
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })



    it('Tenta atualizar registro com nome menor que 3 caracteres', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'Abcd',
                sobrenome: 'da Silva',
                email: 'abcd@gmail.com',
                cidadeId: 16
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .send({
                nome: 'Ab',
                sobrenome: 'dos Santos',
                email: 'abcde@gmail.com',
                cidadeId: 94
            })

        expect(resAtualizada.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resAtualizada.body).toHaveProperty('errors.body.nome')
    })

    it('Tenta atualizar registro com sobrenome menor que 3 caracteres', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'Alberto',
                sobrenome: 'Fernandes',
                email: 'a.fernandes@gmail.com',
                cidadeId: 16
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .send({
                nome: 'Alberto',
                sobrenome: 'Fe',
                email: 'abcde@gmail.com',
                cidadeId: 94
            })

        expect(resAtualizada.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resAtualizada.body).toHaveProperty('errors.body.sobrenome')
    })

    it('Tenta atualizar registro com email com formato incorreto', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'Roberto',
                sobrenome: 'Miranda',
                email: 'r.miranda@gmail.com',
                cidadeId: 16
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .send({
                nome: 'Roberto',
                sobrenome: 'Miranda',
                email: 'roberto.miranda.gmail.com',
                cidadeId: 94
            })

        expect(resAtualizada.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resAtualizada.body).toHaveProperty('errors.body.email')
    })

    it('Tenta atualizar registro com email com formato incorreto', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'Afonso',
                sobrenome: 'Aleluia',
                email: 'a.aleluia@gmail.com',
                cidadeId: 16
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .send({
                nome: 'Afonso',
                sobrenome: 'Aleluia',
                email: 'afonso.aleluiu@gmail.com',
                cidadeId: 'Curitiba'
            })

        expect(resAtualizada.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resAtualizada.body).toHaveProperty('errors.body.cidadeId')
    })

    it('Tenta atualizar registro com id sendo uma string', async () => {

        const res1 = await testServer
            .put('/pessoas/a')
            .send({
                nome: 'Roberto',
                sobrenome: 'Fernandes',
                email: 'a.fernandes@gmail.com',
                cidadeId: 16
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro sem id', async () => {

        const res1 = await testServer
            .put('/pessoas')
            .send({
                nome: 'Roberto',
                sobrenome: 'Fernandes',
                email: 'a.fernandes@gmail.com',
                cidadeId: 16
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })

})