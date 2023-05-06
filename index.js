const mailClient = require('./mailclient')
const mongodbClient = require('./mongodbClient')
const express = require('express')
const { MongoClient } = require('mongodb');


require('dotenv').config()

const app = express()


app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/submitTicket/:sector/:product/:contact/:name', function (req, res) {
    try{
        mailClient.sendMail(req.params.sector, req.params.product, req.params.contact, req.params.name);
        mongodbClient.createTicket(req.params.sector, req.params.product, req.params.contact, req.params.name)
        res.send("sucsess")
        res.end()
    } catch (e) {
        console.log(e)
        res.send(e)
        res.end()
    }
})

app.get('/clearTicket:sector/:product/:contact/:name', function (req, res){
    mongodbClient.clearTicket(req.params.sector, req.params.product, req.params.contact, req.params.name) //should add a check here to avoid accidently clearing the whole database
    res.send("sucsess")
    res.end()
})

app.get('/Tickets', async function (req, res){
    const tickets = await mongodbClient.getTickets()
    res.send(tickets)
    res.end()
})

app.get('/userLogin/:username/:pasword', async function (req, res) {
    const valid = await mongodbClient.checkPasword(req.params.username, req.params.pasword);
    console.log(valid);
    if(valid){
        res.send(true)
        res.end()
    } else {
        res.send(false)
        res.end()
    }

})

app.get('/createUser/:username/:pasword', async function(req, res) {
    const responce = await mongodbClient.createUser(req.params.username, req.params.pasword)
    res.end(responce)
})

app.listen(3000)
console.log("listening on port 3000")


// add salt to pasword hashing algorythem, look at using a different hash as sha256 isnt too great