const path =  require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index' , {
    title: 'Weather app',
    name : 'Ritesh Pamadi'
})
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name : 'Ritesh Pamadi'
})

})

app.get('/help', (req,res) => {
    res.render('help', {
    helpText : 'This is some helpful text',
    title: 'Help' ,
    name : 'Ritesh Pamadi'
     })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
   return res.send({
       error: 'You must provide an address!'
   })
}
geocode(req.query.adress, (error, {latitude,longitude, location}) => {
    if(error) {
        return res.send({error})
    }

    forecast(latitude,longitude, (error,forecastData) => {
        if(error) {
            return res.send({error})
        }

        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
    })
})
})
    
app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error : 'Provide serch  '
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})  
    

app.get('/about/*', (req,res) => {
    req.send('no article found')

})
app.get('*', (req,res) => {
   res.send('My 404 Page')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
