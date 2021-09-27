const express = require('express')
const router = express.Router()
const Notes = require('../Models/noteModel')
const authenticated = require('../Middleware/authMiddleware')

router.use(authenticated)

// Get notes
router.get('/', async (req, res) => {
    try {
        const notes = await Notes.find({
            userId: req.userId
        }).sort({ updatedAt: -1 })
        res.json(notes)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    try {
        const note = await new Notes({
            userId: req.userId,
            title: req.body.title,
            text: req.body.text
        })
        const result = await note.save()
        return res.json(result)
    } catch (err) {
        return res.status(500).json(err)
    }
})

router.put('/', async (req, res) => {
    try {
        const result = await Notes.findByIdAndUpdate({ _id: req.body.id, userId: req.userId }, {
            title: req.body.title,
            text: req.body.text
        })
        res.json(result)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/', async (req, res) => {
    try {
        const result = await Notes.findByIdAndRemove({ _id: req.body.id, userId: req.userId })
        res.json(result)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router