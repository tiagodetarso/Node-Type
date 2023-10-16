import { server } from './server/Server'

const port  = process.env.PORT

server.listen(port || 3333, () => {
    console.log(`API rodando na porta ${port || 3333}`)
})