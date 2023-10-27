import { server } from './server/Server'
import { Knex } from './server/database/knex'

const port  = process.env.PORT

const startServer = () => {
    server.listen(port || 3333, () => {
        console.log(`API rodando na porta ${port || 3333}`)
    })
}

if (process.env.IS_LOCALHOST !== 'true') {
    Knex.migrate.latest()
        .then(() => {
            Knex.seed.run()
                .then(() => startServer())
                .catch(console.log)
        })
        .catch(console.log)
} else {
    startServer()
}