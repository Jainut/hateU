import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt, { genSalt } from 'bcrypt'

const prisma = new PrismaClient()
const router = express.Router()

router.post('/registrar', async (req, res) => {
    const user = req.body

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(user.password, salt)

    try {
        if (user.name == "" || user.email == "" || user.password == "") {
            return res.status(500).json({message: "Campos inválidos, tente novamente"})
        } else {
        const newUser = await prisma.user.create ( {
        data: {
            name: user.name,
            email: user.email,
            curse: user.curse,
            turma: user.turma,
            phone: user.phone,
            password: hashPassword
        }
        })
    }
    }catch (err) {
        console.error(err)

        return res.status(500).json(err)
    }

    res.status(200).json({message:`Sucesso! Usuário registrado êxito!`}) 
})

router.get('/listar', async (req, res) => {
    const consult = await prisma.user.findMany()

    console.log(JSON.stringify(consult, null, 2))

    res.json(consult)
})

router.delete('/deletar/:id', async (req, res) => {
        const { id } = req.params

        try {
            const userDeleted = await prisma.user.delete ({
                where: {
                    id: id
                }
            })

            res.json(userDeleted)

            } catch (err) {
                console.error(err)

                res.status(500).json({message: "Servidor instável, tente novamente mais tarde"})
            }
        }
    )

router.put('/editar/:id', async (req, res) => {
    const { id } = req.params
    const data = req.body
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(data.password, salt)

    try {
        const userEdit = await prisma.user.update ({
            where: {
                id: id
            },
            data: {
                name: data.name,
                email: data.email,
                curse: data.curse,
                turma: data.turma,
                password: hashPassword
            }
        })
        res.json(userEdit)

    } catch(err) {
        console.log(err)

        res.status(500).json({message: "Servidor instável, impossível alterar no momento"})
    }
})

export default router