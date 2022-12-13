import express from 'express'
import { Router, Request, Response } from 'express';
import client, { Connection } from 'amqplib'
import * as dotent from "dotenv"
dotent.config()

async function main() {

    const connection: Connection = await client.connect(process.env.RABBITMQ_HOSTNAME as string)

    const app = express();
    const route = Router()
    app.use(express.json())


    route.get('/health', (req: Request, res: Response) => {
        res.json({ message: 'hello world' })
    })


    route.get('/send', async (req: Request, res: Response) => {
        const channel = await connection.createChannel()
        await channel.assertQueue('myQueue')
        channel.sendToQueue('myQueue', Buffer.from('send'))
        console.log("Menssagem enviada")
        res.json({ Menssagem: "Menssagem enviada" })
    })


    app.use(route)
    app.listen(3001, () => console.log('server running on port 3001'))
}


main()