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
    try {
        console.log(req.body)
        const { login, password } = req.body

        const user = await User.findOne({ login })

        if (!user) {
            console.log('Пользователь отсутствует в базе.')
            return res.status(400).json({ message: 'Пользователь отсутствует в базе.' })
        }
        if (user.password !== password) {
            console.log('Неверный логин или пароль!')
            return res.status(400).json({ message: 'Неверный логин или пароль!' })
        }

        const jwtToken = generateAccessToken(user._id, user.login)

        return res.json({
            token: jwtToken
        })
    } catch (err) {
        res.json({
            message: 'Неизвестная ошибка.'
        })
            .status(500)

        console.error(err)

        return
    }
})

app.post('/calculator/add', async (req, res) => {
    try {
        console.log(req.body)
        const { token, calculator } = req.body

        const user = await User.findOne({ login: jsonwebtoken.verify(token, secret).login },
            { returnOriginal: false })

        if (user === null) {
            console.log('Пользователь отсутствует в базе.')

            return res.json({
                message: 'Пользователь отсутствует в базе.'
            })
                .status(400)
        }

        const calc = new Calculator(calculator)
        await calc.save()

        return res.json({
            message: 'Калькулятор добавлен. Перезагрузите страницу.'
        })
    } catch (err) {
        res.json({
            message: 'Неизвестная ошибка.'
        })
            .status(500)

        console.error(err)

        return
    }
})

app.post('/calculator/delete/:id', async (req, res) => {
    try {
        console.log(req.body)
        const token = req.body.token
        const id = req.params.id

        const user = await User.findOne({ login: jsonwebtoken.verify(token, secret).login },
            { returnOriginal: false })

        if (user === null) {
            console.log('Пользователь отсутствует в базе.')

            return res.json({
                message: 'Пользователь отсутствует в базе.'
            })
                .status(400)
        }

        await Calculator.findByIdAndDelete(id)

        return res.json({
            message: 'Калькулятор удалён. Перезагрузите страницу.'
        })
    } catch (err) {
        console.error(err)

        return res.json({
            message: 'Неизвестная ошибка.'
        })
            .status(500)
    }
})

app.post('/calculator/edit/:id', async (req, res) => {
    try {
        console.log(req.body)
        const { token, calculator } = req.body
        const id = req.params.id

        const user = await User.findOne({ login: jsonwebtoken.verify(token, secret).login },
            { returnOriginal: false })

        if (user === null) {
            console.log('Пользователь отсутствует в базе.')

            return res.json({
                message: 'Пользователь отсутствует в базе.'
            })
                .status(400)
        }

        await Calculator.findByIdAndUpdate(id, calculator)

        return res.json({
            message: 'Калькулятор изменён. Вернитесь к списку калькуляторов.'
        })
    } catch (err) {
        console.error(err)
        
        return res.json({
            message: 'Неизвестная ошибка.'
        })
            .status(500)
    }
})

app.get('/calculator/get/one/:id', async (req, res) => {
    try {
        const id = req.params.id
        const calc = await Calculator.findById(id);
        return res.json({ data: calc })
    } catch (err) {
        console.error(err)

        return res.json({
            message: 'Неизвестная ошибка.'
        })
            .status(500)
    }
})

app.get('/calculator/get/all', async (req, res) => {
    try {
        const calc = await Calculator.find({})
        res.json({ data: calc })
    } catch (err) {
        console.error(err)

        return res.json({
            message: 'Неизвестная ошибка.'
        })
            .status(500)
    }
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
