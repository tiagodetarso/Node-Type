import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - UpdateById', () => {


    it('Atualiza registro', async () => {

        const res1 = await testServer
            .post('/cidades')
            .send({nome: 'Jaguapitã'})

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .send({nome: 'Jagua'})

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT)
    })

    it('Tenta atualizar registro que não existe', async () => {

        const res1 = await testServer
            .put('/cidades/99999')
            .send({nome: 'Qualquer'})
            
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })


    it('Tenta atualizar registro com nome menor que 3 caracteres', async () => {
        
        const res1 = await testServer
            .post('/cidades')
            .send({nome: 'Cascavel'})

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .send({nome: 'As'})
        
        expect(resAtualizada.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resAtualizada.body).toHaveProperty('errors.body.nome')
    })
    
    it('Tenta atualizar registro enviando nome vazio', async () => {
        
        const res1 = await testServer
            .post('/cidades')
            .send({nome: 'Foz do Iguaçu'})

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .send({nome: ''})
        
        expect(resAtualizada.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resAtualizada.body).toHaveProperty('errors.body.nome')
    })


    it('Tenta atualizar registro com id = 0', async () => {
        
        const res1 = await testServer
            .put('/cidades/0')
            .send({nome: 'Astorga'})
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })
    
    it('Tenta atualizar registro com id não inteiro', async () => {
        
        const res1 = await testServer
            .put('/cidades/1.1')
            .send({nome: 'Astorga'})
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })
    
    it('Tenta atualizar registro sem id', async () => {
        
        const res1 = await testServer
            .put('/cidades')
            .send({nome: 'Astorga'})
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.params.id')
    })
    
})