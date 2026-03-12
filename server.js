import 'dotenv/config'
import express from 'express'
import publicRouter from './routes/public.js'

const app = express()
app.use(express.json())

app.use('/', publicRouter, () => {
    res.send("Rodando essa bomba 🔥")
})

app.listen(3000, () => {console.log("Desgraça sô")})