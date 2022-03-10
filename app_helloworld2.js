const express = require('express')
const res = require('express/lib/response')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.json({
        id: 1,
        reason: "banned"
    })
})

app.get('/hellome', (req, res) => {
    res.send('Hello Me ::<')
})

app.listen(port, () => {
    console.log('I\'m running ...');
})