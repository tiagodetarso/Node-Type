import { Knex } from 'knex'
import path from 'path'

export const development: Knex.Config = {
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
    ...development,
    connection: ':memory:',
}


export const production: Knex.Config  = {
    client: 'pg',
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations')
    },
    seeds : {
        directory: path.resolve(__dirname, '..', 'seeds')
    },
    connection: {
        host: process.env.DB_HOST ,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT || 5432),
        ssl: { rejectUnauthorized: false},
    },
}

/*
export const production: Knex.Config  = {
    ...development,
}
*/
