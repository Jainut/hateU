import 'dotenv/config'
import express from 'express'
import publicRouter from './routes/public.js'

const port = process.env.PORT || 3000
const app = express()
app.use(express.json())

app.use('/', publicRouter)
app.get('/', (req, res) => {
    res.send("Rodando essa bomba 🔥🔥🔥")
})

app.listen(port, () => {console.log("Rodando o servidor... 🔥")})