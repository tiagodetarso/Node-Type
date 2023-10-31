import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Usuários - SignIn', () => {

    beforeAll(async () => {
        await testServer.post('/cadastrar')
            .send({
                nome: 'Teste',
                email: 'teste@teste.com',
                senha: '123abc'
            })
    })

    it('Login bem-sucedido', async () => {

        const res1 = await testServer
            .post('/entrar')
            .send({
                email: 'teste@teste.com',
                senha: '123abc'
            })

        expect(res1.statusCode).toEqual(StatusCodes.OK)
        expect(res1.body).toHaveProperty('accessToken')
    })

    it('Tenta fazer login com email inválido', async () => {
        
        const res1 = await testServer
            .post('/entrar')
            .send({
                email: 'teste@teste.com.br',
                senha: '123abc'
            })
        
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(res1.body).toHaveProperty('errors.default')
    })

    it('Tenta fazer login com senha inválida', async () => {
        
        const res1 = await testServer
            .post('/entrar')
            .send({
                email: 'teste@teste.com',
                senha: '123abd'
            })
        
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(res1.body).toHaveProperty('errors.default')
    })

    it('Tenta fazer login com e-mail em formato incorreto', async () => {
        
        const res1 = await testServer
            .post('/entrar')
            .send({
                email: 'teste.teste.com',
                senha: '123abd'
            })
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.email')
    })

    it('Tenta fazer login com senha de menos de 6 caracteres', async () => {
        
        const res1 = await testServer
            .post('/entrar')
            .send({
                email: 'teste@teste.com',
                senha: '123ab'
            })
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.senha')
    })
    
    it('Tenta fazer login sem e-mail e senha', async () => {
        
        const res1 = await testServer
            .post('/entrar')
            .send({})
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.senha')
        expect(res1.body).toHaveProperty('errors.body.email')
    })
})