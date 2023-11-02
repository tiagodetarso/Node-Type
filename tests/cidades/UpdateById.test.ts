import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - UpdateById', () => {

    let accessToken = ''

    beforeAll(async () => { 
        const email = 'updatebyid-cidade@gmail.com'
        const senha = '123abc'
        await testServer.post('/cadastrar').send({
            nome: 'Teste',
            email: email,
            senha: senha
        })

        const signInRes = await testServer.post('/entrar').send({ email, senha})

        accessToken = signInRes.body.accessToken
    })


    it('Tenta atualizar registro sem autenticação', async () => {

        const res1 = await testServer
            .post('/cidades')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({nome: 'Jaguapitã'})

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .send({nome: 'Jagua'})

        expect(resAtualizada.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(resAtualizada.body).toHaveProperty('errors.default')

        const resVerificar = await testServer
            .get(`/cidades/${res1.body}`)
            .send()
        
        expect(resVerificar.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(resVerificar.body).toHaveProperty('errors.default')
    })

    it('Atualiza registro', async () => {

        const res1 = await testServer
            .post('/cidades')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({nome: 'Jaguapitã'})

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .set({Authorization: `Bearer ${accessToken}`})
            .send({nome: 'Jagua'})

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT)

        const resVerificar = await testServer
            .get(`/cidades/${res1.body}`)
            .set({Authorization: `Bearer ${accessToken}`})
            .send()
        
        expect(resVerificar.statusCode).toEqual(StatusCodes.OK)
        expect(resVerificar.body.nome).toEqual('Jagua')
    })

    it('Tenta atualizar registro que não existe', async () => {

        const res1 = await testServer
            .put('/cidades/99999')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({nome: 'Qualquer'})
            
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })


    it('Tenta atualizar registro com nome menor que 3 caracteres', async () => {
        
        const res1 = await testServer
            .post('/cidades')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({nome: 'Cascavel'})

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .set({Authorization: `Bearer ${accessToken}`})
            .send({nome: 'As'})
        
        expect(resAtualizada.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resAtualizada.body).toHaveProperty('errors.body.nome')
    })
    
    it('Tenta atualizar registro enviando nome vazio', async () => {
        
        const res1 = await testServer
            .post('/cidades')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({nome: 'Foz do Iguaçu'})

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .set({Authorization: `Bearer ${accessToken}`})
            .send({nome: ''})
        
        expect(resAtualizada.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resAtualizada.body).toHaveProperty('errors.body.nome')
    })


    it('Tenta atualizar registro com id = 0', async () => {
        
        const res1 = await testServer
            .put('/cidades/0')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({nome: 'Astorga'})
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })
    
    it('Tenta atualizar registro com id não inteiro', async () => {
        
        const res1 = await testServer
            .put('/cidades/1.1')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({nome: 'Astorga'})
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })
    
    it('Tenta atualizar registro sem id', async () => {
        
        const res1 = await testServer
            .put('/cidades')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({nome: 'Astorga'})
        
        expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })
    
})