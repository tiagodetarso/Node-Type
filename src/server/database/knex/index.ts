import { knex } from 'knex'
import { devlopment, production, test } from './Environment'


const getEnvironment = () => {
    switch (process.env.NODE_ENV) {
        case 'production': return production
        case 'test': return test   
    
        default: return devlopment
    }
}

export const Knex = knex(getEnvironment())