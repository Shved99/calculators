const PORT = 9001
const URLDB = 'mongodb://127.0.0.1:27017/'

const express = require('express')
const cors = require('cors')
const jsonwebtoken = require('jsonwebtoken')
const mongoose = require('mongoose')
const { secret } = require('./config')
const User = require('./models/User')
const Calculator = require('./models/Calculator')

const app = express()

const generateAccessToken = (id, login) => {
    const payload = {
        id, login
    }

    return jsonwebtoken.sign(payload, secret, { expiresIn: '24h' })
}

app.use(cors())
app.use(express.json())

app.post('/login', async (req, res) => {
    console.log(req.body)
    const { login, password } = req.body
    let user

    try {
        user = await User.findOne({ login })
    } catch (err) {
        res.json({
            message: 'Неизвестная ошибка.'
        })
            .status(500)

        console.error(err)

        return
    }

    if (!user) {
        console.log('Пользователь отсутствует в базе.')
        return res.status(400).json({ message: 'Пользователь отсутствует в базе.' })
    }
    if (user.password !== password) {
        console.log('Неверный логин или пароль!')
        return res.status(400).json({ message: 'Неверный логин или пароль!' })
    }
    const jwtToken = generateAccessToken(user._id, user.login)

    res.json({
        token: jwtToken
    })
})

app.post('/calculator/add', async (req, res) => {
    console.log(req.body)
    const { token, calculator } = req.body

    try {
        const user = await User.findOne({ login: jsonwebtoken.verify(token, secret).login },
                                    { returnOriginal: false })

        if (user === null) {
            res.json({
                message: 'Пользователь отсутствует в базе.'
            })
                .status(400)

            console.log('Пользователь отсутствует в базе.')
        }

        const calc = new Calculator(calculator)
        await calc.save()
    } catch (err) {
        if (err && err.code !== 11000) {
            res.json({
                message: 'Неизвестная ошибка.'
            })
                .status(500)
            
            console.log(err)

            return
        }

        //duplicate key
        if (err && err.code === 11000) {
            res.json({
                message: 'Не используйте повторно это имя!'
            })
                .status(400)

            console.error('Не используйте повторно это имя!')

            return
        }
    }

    res.json({
        message: 'Калькулятор добавлен!'
    })
})

app.get('/calculator/get/one/:id', async (req, res) => {
    const id = req.params.id
    let calc

    try {
        calc = await Calculator.findById(id);
    } catch (err) {
        res.json({
            message: 'Неизвестная ошибка.'
        })
            .status(500)
        
        console.error(err)

        return
    }

    res.json({data: calc})
})

app.get('/calculator/get/all', async (req, res) => {
    let calc

    try {
        calc = await Calculator.find({}, 'nameCalc')
    } catch (err) {
        res.json({
            message: 'Неизвестная ошибка.'
        })
            .status(500)

        console.error(err)

        return
    }

    res.json({data: calc})
})

const start = async () => {
    try {
        await mongoose.connect(URLDB)
        app.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}`))
    } catch (e) {
        console.error(e)
    }
}

start()
