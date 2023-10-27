import { server } from './Server'
import { Knex } from './database/knex'

const port  = process.env.PORT

const startServer = () => {
    server.listen(port || 3333, () => {
        console.log(`API rodando na porta ${port || 3333}`)
    })
}

if (process.env.IS_LOCALHOST !== 'true') {
    Knex.migrate.latest()
        .then(() => {
            startServer()
        })
        .catch(console.log)
} else {
    startServer()
}