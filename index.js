'use strict';
const express = require('express')
const { join } = require('path')
const app = express()

app.use(express.json({ limit: '1kb' }))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(__dirname, 'public')))

app.get('/file/:name', function (req, res) {
    const name = req.params.name
    const availFiles = ['doc', 'doc1']
    let opt_ = ''
    
    if (name && availFiles.includes(name)) {
        opt_ = name
    } else {
        opt_ = 'doc2'
    }

    res.sendFile(join(__dirname, `public/${opt_}.pdf`))
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + 'public/index.html')
})

app.use('*', function (req, res) {
    res.status(404).send('Not Found')
})

app.use(function (err, req, res, next) {
    res.status(500).send('Internal Server Error')
})

app.listen(4000, function () {
    console.log('App listening on port ::4000')
})