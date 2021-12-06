const nodemailer = require('nodemailer')
const config = require('./auth.config')

const user = config.user
const pass = config.pass

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: user,
        pass: pass
    },
})

module.exports.sendNewsLetter = ( email ,sub ,text) => {
    
        console.log('test1')
        transport.sendMail({
            from:user,
            to: email,
            subject:sub,
            text:text
        })
        .catch(error =>{
            console.log(error)
        })
    
     
}


