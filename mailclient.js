const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config()

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

async function sendMail(sector, product, contactEmail, name){

    try{
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'colabs101@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            }
        })

        const mailOptions = {
            from: 'TICKET REQUEST <colabs101@gmail.com>',
            to: 'colabs101@gmail.com',
            subject: 'TICKET REQUEST',
            text: 'Ticket logged from web page with following information \n Name: ' + name + '\n Sector: ' + sector + '\n Product: ' + product + '\n Contact email: ' + contactEmail ,
            //html: '<h1> hello luca this is a test of the email <h1>',

        }

        return await transport.sendMail(mailOptions)

    } catch (e) {
        return e
    }
}

async function sendCustomerMail(sector, product, contactEmail, name){

    try{
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'colabs101@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            }
        })

        const mailOptions = {
            from: 'CoLabs software <colabs101@gmail.com>',
            to: contactEmail,
            subject: 'CoLabs Service Request',
            text: "Thanks for contacting colabs software, you request has been processed in our system and we will be in contact shortly to discuss your requirments and needs",
            //html: '<h1> hello luca this is a test of the email <h1>',

        }

        return await transport.sendMail(mailOptions)

    } catch (e) {
        return e
    }

}



//sendMail()
    //.then((result) => console.log('Email sent ...', result))
    //.catch((e) => console.log(e.message));

module.exports.sendMail = sendMail;
module.exports.sendCustomerMail = sendCustomerMail;