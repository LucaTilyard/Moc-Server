const crypto = require('crypto')
var randomstring = require("randomstring");
const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://colabs101:oQNnWHUA3rgrTFAj@colabsworkflow.8g8asze.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
const dbName = 'Staff';

const hash = crypto.createHash('sha256').update("pasword123" + "7pwcovEPSGPsVjwnHUrLcruSfbi9GrOs").digest('hex');

function changePasswordViaAdmin(){

}

