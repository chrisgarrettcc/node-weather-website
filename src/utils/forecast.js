const request = require('postman-request');

const forecast = (lattitude, longditude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1883f939380fc524bbeb6b2f9f8d0611&query=' + encodeURIComponent(lattitude) + ',' + encodeURIComponent(longditude);
    request( {
        url ,
        json : true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Could not find co-ordinates. Please try again with a different search term', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees, it feels more like " + body.current.feelslike + ' degress out. The humidity is ' + body.current.humidity + '%')
        }
    })

}

module.exports = forecast
