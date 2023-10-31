import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Usuários - SignUp', () => {
    
    it('Cria registro', async () => {

        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome: 'Fulano',
                email: 'fulano@gmail.com',
                senha: '123abc'
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res1.body).toEqual('number')
    })

    it('Tenta criar registro com email duplicado', async () => {
        
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome: 'Cicrano',
                email: 'cicrano@gmail.com',
                senha: '123abc'
            })
        
        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res1.body).toEqual('number')
        
        const res2 = await testServer
            .post('/cadastrar')
            .send({
                nome: 'Marreco',
                email: 'cicrano@gmail.com',
                senha: '123abc'
            })
        
        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res2.body).toHaveProperty('errors.default')
    })
    
    it('Tenta criar registro sem nome', async () => {
        
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                email: 'anonimo@gmail.com',
                senha: '123abc'
            })
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.nome')
    })
    
    it('Tenta criar registro sem email', async () => {
        
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome: 'Fulano',
                cidadeId: '123abc'
            })
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.email')
    })
    
    it('Tenta criar registro sem senha', async () => {
        
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome: 'Fulano',
                sobrenome: 'de Tal',
            })
            
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.senha')
    })
        
    it('Tenta criar registro com nome de menos de 3 caracteres', async () => {
        
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome: 'Fu',
                email: 'nomecurto@gmail.com',
                senha: '123abc'
            })
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.nome')
    })
    
    it('Tenta criar registro com senha de menos de 6 caracteres', async () => {
        
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome: 'Usuario',
                email: 'semsenha@gmail.com',
                senha: '123ab'
            })
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.senha')
    })
    
    it('Tenta criar registro com email sem formato de e-mail', async () => {
        
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome: 'Fulano',
                email: 'fulano.gmail.com',
                senha: '123abc'
            })
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.email')
    })
    
    it('Tenta criar registro vazio', async () => {

        const res1 = await testServer
            .post('/cadastrar')
            .send({})

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.nome')
        expect(res1.body).toHaveProperty('errors.body.email')
        expect(res1.body).toHaveProperty('errors.body.senha')
    })
    
})