import knex from 'knex'
import { ETableNames } from '../../ETableName'

export const deleteById = async (id:number): Promise<void | Error> => {
    try {
        const result = await knex(ETableNames.cidade)
            .where('id', '=', id)
            .del()
        
        if (result > 0) return

        return new Error ('Erro ao apagar registro')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao cadastrar registro:')
    }
}