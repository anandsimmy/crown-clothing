const express= require('express')
const cors= require('cors')
const bodyParser= require('body-parser')
const path= require('path')
const compression= require('compression')
const enforce= require('express-sslify')

const app= express()
const port= process.env.PORT || 5000

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const stripe= require('stripe')(process.env.STRIPE_SECRET_KEY)

app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( { extended:true } ))
app.use(cors())
app.use(enforce.HTTPS({ trustProtoHeader: true }))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve('__dirname', '..', 'build', 'service-worker.js'))
})

app.post('/payment', (req, res) => {
    const body= {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'INR',
        description: 'crown clothing'
    }
    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if(stripeErr) {
            res.status(500).send({ error: stripeErr })
        }
        else {
            res.status(200).send(stripeRes)
        }
    })
})

app.listen(port, error =>{ 
    if(error) 
        throw error
    console.log('server running on port:', port)
})
