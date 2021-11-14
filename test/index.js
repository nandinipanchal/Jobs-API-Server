let expect = require('chai').expect
let chaiHttp = require('chai-http')
let chai = require('chai')
chai.should()
chai.use(chaiHttp)

let BASE_URL= 'http://localhost:7000'
describe('JOBS API', () => {
    
    describe('GET /' ,()=>{
        //the main route
        it('it should return the home page', (done)=>{
            chai.request(BASE_URL)
            .get('/')
            .end((err,res) =>{
                res.should.have.status(200)
                res.text.should.equal('Welcome')
                done()
            })
        })

        //get all public jobs
        it('it should return the public jobs' ,(done) => {
            chai.request(BASE_URL)
            .get('/api/v1')
            .end((err,res) =>{
                res.should.have.status(200)
                res.body.should.a('object')
                // res.body.length.should.not.be.equal(0)
                done()
            })
        })

        it('it should return error msg to unauthorized access' , (done) =>{
            chai.request(BASE_URL)
            .get('/api/v1/job')
            .end((err,res) => {
                res.text.should.equal('Authentication failed')
                done()
            })
        })
    })
})