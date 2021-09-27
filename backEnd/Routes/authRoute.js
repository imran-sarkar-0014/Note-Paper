const express = require('express')
const router = express.Router()
const Users = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const bycrypt = require('bcrypt')

//regisert
router.post('/register', async (req, res) => {
    try {

        const salt = await bycrypt.genSalt()
        req.body.password = await bycrypt.hash(req.body.password, salt)

        const user = await new Users({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        })
        const result = await user.save()

        const token = jwt.sign({ userId: result._id }, process.env.JWTSCRET)

        return res.json(token)
    } catch (err) {
        return res.status(500).json(err)
    }
})


//login
router.post('/login', async (req, res) => {
    try {
        const user = await Users.findOne({
            email: req.body.email
        })

        if (user === null)
            return res.status(404).json('wrong email')
        if (await bycrypt.compare(req.body.password, user.password)) {

            const token = jwt.sign({ userId: user._id }, process.env.JWTSCRET)
            return res.json(token)

        }

        return res.status(404).json('wrong Password')

    } catch (err) {
        return res.status(500).json(err)
    }
})



module.exports = router