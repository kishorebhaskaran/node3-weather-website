const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=0e0829de4acc384b0d7b4536d3d385de&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to the weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '% and the wind speed is ' + body.current.wind_speed + ' km/hr.')
    }
  })
}
module.exports = forecast