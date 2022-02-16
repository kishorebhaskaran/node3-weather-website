const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars (hbs) and views engine
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve 
app.use(express.static(publicDirPath))

app.get('',(req,res) =>{
res.render('index',{
  title: 'Weather',
  name: 'Kumar Bhaskaran'
})
})

app.get('/about',(req,res) =>{
res.render('about',{
  title: 'About Me',
  name: 'Kumar Bhaskaran'
})
})

app.get('/help',(req,res)=>{
  res.render('help',{
    helpMessage: 'If you need help on the Weather service please contact foo@xyz.com',
    title: 'Help',
    name: 'Kumar Bhaskaran'
  })
})

app.get('/weather',(req,res) => {
  if (!req.query.address){
    return res.send({
      error: 'Address is a required term!'
    })
  }else {
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
      if (error){
        return res.send({error})
      }
      forecast(latitude, longitude,(error,forecastData) =>{
        if (error){
          return res.send({error})
        } 
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        })
      })
    })  
  }
})

app.get('/products', (req,res) =>{
  if (!req.query.search){
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req,res) =>{
  res.render('404',{
    ErrorMsg: 'Help article not found',
    title: '404 Error!',
    name: 'Kumar Bhaskaran'
  })

})

app.get('*', (req,res) =>{
res.render('404',{
  ErrorMsg: 'Page Not Found',
  title: '404 Error!',
  name: 'Kumar Bhaskaran'
})
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})