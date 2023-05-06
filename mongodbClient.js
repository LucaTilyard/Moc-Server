const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const crypto = require('crypto');
var randomstring = require("randomstring");

const url = 'mongodb+srv://colabs101:oQNnWHUA3rgrTFAj@colabsworkflow.8g8asze.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
const dbName = 'Staff';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const StaffInfoSchema = new mongoose.Schema({
    UserName: String,
    Pasword: String,
    Salt: String
});

StaffInfoSchema.methods.getPasword = function getPasword() {
    return this.Pasword
}

StaffInfoSchema.methods.getUser = function getUserName() {
    return this.UserName
}

StaffInfoSchema.methods.getSalt = function getSalt() {
    return this.Salt
}

const StaffInfo = mongoose.model('StaffInfo', StaffInfoSchema);



async function checkPasword(username, pasword) {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('LoginCredentials');
    const Salt = new StaffInfo ((await collection.find({ "UserName": username }).toArray()).shift()).getSalt();
    const hash = crypto.createHash('sha256').update(pasword + Salt).digest('hex');
    const Userpasword = new StaffInfo ((await collection.find({ "UserName": username }).toArray()).shift()).getPasword();
    await client.close()
    return Userpasword === hash;
}

async function createUser(username, pasword) {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('LoginCredentials');
    const Salt = randomstring.generate(32)
    const hash = crypto.createHash('sha256').update(pasword + Salt).digest('hex');
    const doc = { UserName: username, Pasword: hash, Salt: Salt }
    const result = await collection.insertOne(doc)
    console.log(result)
    await client.close()
}

async function createTicket(sector, product, contact, name) {
    await client.connect();
    console.log("Connected to server sucsesfully");
    const db = client.db("Customers");
    const collection = db.collection("Tickets");
    const doc = { Sector: sector, Product: product, Contact: contact, Name: name}
    await collection.insertOne(doc)
    client.close()
}

async function clearTicket(sector, product, contact, name) {
    await client.connect();
    console.log("Connected to server sucsesfully");
    const db = client.db("Customers");
    const collection = db.collection("Tickets");
    const doc = { Sector: sector, Product: product, Contact: contact, Name: name};
    await collection.deleteOne(doc);
    client.close();
}

async function getTickets() {
    await client.connect();
    console.log("Connected to server sucsesfully");
    const db = client.db("Customers");
    const collection = db.collection("Tickets");
    const tickets = await collection.find({}).toArray()
    console.log(tickets)
    client.close()
    return tickets
}






module.exports.checkPasword = checkPasword;
module.exports.createUser = createUser;
module.exports.createTicket = createTicket;
module.exports.clearTicket = clearTicket;
module.exports.getTickets = getTickets;