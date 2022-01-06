require('dotenv').config()
const nodemailer = require('nodemailer')

const user = process.env.USER
const pass = process.env.PASS

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: user,
        pass: pass
    },
})

module.exports.sendNewsLetter = ( email ,sub,text ) => {
    
        console.log('test1')
        transport.sendMail({
            from:user,
            to: email,
            subject:sub,
            text: text,
            attachments:[{
                filename:'Amazon-order.pdf',
                path:__dirname+'/Amazon-order.pdf',
                contentType:'application/pdf'
            }]
        })
        .catch(error =>{
            console.log(error)
        })
    
     
} 


