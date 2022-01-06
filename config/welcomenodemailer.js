require('dotenv').config()
const nodemailer = require('nodemailer')
// const config = require('./auth.config')
const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')

const user = process.env.USER
const pass = process.env.PASS

const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/index.hbs"), "utf8")


const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: user,
        pass: pass
    },
})

const template = handlebars.compile(emailTemplateSource)
  
module.exports.sendConfirmationEmail = ( name,email) => {
    const htmlTosend = template({name:name})
        console.log('test0')
        transport.sendMail({
            from: user,
            to: email,
            subject: `Welcome to job's portal`,
            html:htmlTosend
        })
        .catch(error => {
                console.log("failed to send email")
                console.log(error)
            })
   
}


