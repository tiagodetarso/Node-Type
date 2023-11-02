import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Pessoas - DeleteById', () => {

    let cidade: number | undefined = undefined
    let accessToken = ''

    beforeAll(async () => {
        const email = 'deletebyid-pessoa@gmail.com'
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


    it('Tenta deletar registro sem autenticação', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({
                nome: 'Cicrano',
                sobrenome: 'De Tal',
                email: 'cicrano@gmail.com',
                cidadeId: cidade
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resApagada = await testServer
            .delete(`/pessoas/${res1.body}`)
            .send()

        expect(resApagada.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(resApagada.body).toHaveProperty('errors.default')
    })

    it('Deleta registro', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({
                nome: 'Americano',
                sobrenome: 'De Tal',
                email: 'americano@gmail.com',
                cidadeId: cidade
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resApagada = await testServer
            .delete(`/pessoas/${res1.body}`)
            .set({Authorization: `Bearer ${accessToken}`})
            .send()

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT)
    })

    it('Tenta deletar registro que não existe', async () => {

        const res1 = await testServer
            .delete('/pessoas/99999')
            .set({Authorization: `Bearer ${accessToken}`})
            .send()

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })

    it('Tenta deletar registro com id do tipo string', async () => {

        const res1 = await testServer
            .delete('/pessoas/A')
            .set({Authorization: `Bearer ${accessToken}`})
            .send()

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })

    it('Tenta deletar registro com id igual a zero', async () => {

        const res1 = await testServer
            .delete('/pessoas/0')
            .set({Authorization: `Bearer ${accessToken}`})
            .send()

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })

    it('Tenta deletar registro com id igual a número não inteiro', async () => {

        const res1 = await testServer
            .delete('/pessoas/1.1')
            .set({Authorization: `Bearer ${accessToken}`})
            .send()

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })
})