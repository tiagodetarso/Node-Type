import { Knex } from 'knex'
import path from 'path'

export const devlopment: Knex.Config = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations')
    },
    seeds : {
        directory: path.resolve(__dirname, '..', 'seeds')
    },
    /* a configuração abaixo é só para sqlite, ou seja, para desenvolvimento */
    pool : {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        afterCreate: (connection: any, done: Function) => {
            connection.run('PRAGMA foreign_keys = ON')
            done()
        }
    }
}

export const test: Knex.Config  = {
    ...devlopment,
    connection: ':memory:',
}

export const production: Knex.Config  = {
    ...devlopment,
}