import { ETableNames } from '../../ETableName'
import { Knex } from '../../knex'

export const deleteById = async (id:number): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.cidade)
            .del()
            .where('id', '=', id)
        
        if (result > 0) return

        return new Error ('Erro ao apagar registro')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao cadastrar registro:')
    }
}