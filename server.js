require('dotenv').config()
const express = require('express')
const app = express()
const Server = require('http').Server(app)
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

app.use(cors({
    origin: '*'
}))
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(morgan('tiny'))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/notepaper').then(res => {
    console.log('database connected')
}).catch(err => {
    console.log("Database Error")
})




// import routers 
const authRouter = require('./backEnd/Routes/authRoute')
const noteRouter = require('./backEnd/Routes/notesRoute')

app.use('/api/auth', authRouter)
app.use('/api/notes', noteRouter)


// static assets

const staticPath = path.resolve(__dirname, 'frontEnd', 'build')
app.use('/', express.static(staticPath))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontEnd', 'build', 'index.html'))
})


const PORT = process.env.PORT || 5000
Server.listen(PORT, () => {
    console.log(`Server listing on port ${PORT}`)
})