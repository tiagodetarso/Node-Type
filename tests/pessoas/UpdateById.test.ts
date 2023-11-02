import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Pessoas - UpdateById', () => {

    let cidade: number | undefined = undefined
    let accessToken = ''

    beforeAll(async () => {
        const email = 'updatebyid-pessoa@gmail.com'
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


    it('Tenta atualizar registro sem autenticação', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({
                nome: 'Abcd',
                sobrenome: 'da Silva',
                email: 'abcd@gmail.com',
                cidadeId: cidade
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .send({
                nome: 'Abcde',
                sobrenome: 'dos Santos',
                email: 'abcde@gmail.com',
                cidadeId: cidade
            })

        expect(resAtualizada.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(resAtualizada.body).toHaveProperty('errors.default')

        const resVerificar = await testServer
            .get(`/pessoas/${res1.body}`)
            .send()

        expect(resVerificar.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(resVerificar.body).toHaveProperty('errors.default')
    })

    it('Atualiza registro', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({
                nome: 'Abc',
                sobrenome: 'de 123',
                email: 'abc123@gmail.com',
                cidadeId: cidade
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .set({Authorization: `Bearer ${accessToken}`})
            .send({
                nome: 'Abcdácio',
                sobrenome: 'dos Números',
                email: 'abcd123@gmail.com',
                cidadeId: cidade
            })

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT)

        const resVerificar = await testServer
            .get(`/pessoas/${res1.body}`)
            .set({Authorization: `Bearer ${accessToken}`})
            .send()

        expect(resVerificar.statusCode).toEqual(StatusCodes.OK)
        expect(resVerificar.body.email).toEqual('abcd123@gmail.com')
    })

    it('Tenta atualizar registro que não existe', async () => {

        const res1 = await testServer
            .put('/pessoas/99999')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({
                nome: 'Abcde',
                sobrenome: 'dos Santos',
                email: 'abcde@gmail.com',
                cidadeId: cidade
            })
            
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })

    it('Tenta atualizar registro com nome menor que 3 caracteres', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({
                nome: 'Solidão',
                sobrenome: 'da Multitude',
                email: 'solitude@gmail.com',
                cidadeId: cidade
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .set({Authorization: `Bearer ${accessToken}`})
            .send({
                nome: 'So',
                sobrenome: 'dos Santos',
                email: 'solitude@gmail.com',
                cidadeId: cidade
            })

        expect(resAtualizada.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resAtualizada.body).toHaveProperty('errors.body.nome')
    })

    it('Tenta atualizar registro com sobrenome menor que 3 caracteres', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({
                nome: 'Alberto',
                sobrenome: 'Fernandes',
                email: 'a.fernandes@gmail.com',
                cidadeId: cidade
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .set({Authorization: `Bearer ${accessToken}`})
            .send({
                nome: 'Alberto',
                sobrenome: 'Fe',
                email: 'abcde@gmail.com',
                cidadeId: cidade
            })

        expect(resAtualizada.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resAtualizada.body).toHaveProperty('errors.body.sobrenome')
    })

    it('Tenta atualizar registro com email com formato incorreto', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({
                nome: 'Roberto',
                sobrenome: 'Miranda',
                email: 'r.miranda@gmail.com',
                cidadeId: cidade
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .set({Authorization: `Bearer ${accessToken}`})
            .send({
                nome: 'Roberto',
                sobrenome: 'Miranda',
                email: 'roberto.miranda.gmail.com',
                cidadeId: cidade
            })

        expect(resAtualizada.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resAtualizada.body).toHaveProperty('errors.body.email')
    })

    it('Tenta atualizar registro com email com formato incorreto', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({
                nome: 'Afonso',
                sobrenome: 'Aleluia',
                email: 'a.aleluia@gmail.com',
                cidadeId: cidade
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .set({Authorization: `Bearer ${accessToken}`})
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
            .set({Authorization: `Bearer ${accessToken}`})
            .send({
                nome: 'Roberto',
                sobrenome: 'Fernandes',
                email: 'a.fernandes@gmail.com',
                cidadeId: cidade
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })

    it('Tenta atualizar registro sem id', async () => {

        const res1 = await testServer
            .put('/pessoas')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({
                nome: 'Roberto',
                sobrenome: 'Fernandes',
                email: 'a.fernandes@gmail.com',
                cidadeId: cidade
            })

        expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })

})