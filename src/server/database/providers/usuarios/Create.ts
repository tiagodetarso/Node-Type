import { IUsuario } from '../../models'
import { ETableNames } from '../../ETableName'
import { Knex } from '../../knex'

export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<Number | Error> => {
    try {
        const [result] = await Knex(ETableNames.usuario).insert(usuario, ['id'])
        
        if (typeof result === 'object') {
            return result.id
        } else if (typeof result === 'number'){
            return result
        }

        return new Error ('Erro ao cadastrar o registro')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao cadastrar o registro')
    }
}