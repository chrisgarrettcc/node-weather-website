const path = require('path');
const express = require('express')
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');



const app = express();

const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Chris Garrett'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Chris Garrett'
    })
})



app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a help message',
        name: 'Chris Garrett'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            errorMessgae: 'You must provide an address'
        });
    }
    let place = req.query.address;
    geocode(place, (error, { latitiude, longditude, location }= {} ) => {
        if (error) {
            return res.send({
                errorMessage: error
            });
        }
        forecast(latitiude, longditude, (error, forecastData) => {
            if (error) {
                return res.send({
                    errorMessage: error
                });
            }
            res.send({
                location: location,
                forecast: forecastData,
                address : place
                
            })
            

        })

    })

})



// handle 404
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        message: 'Help topic not found!',
        name: 'Chris Garrett'
    })
})

// handle 404
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        message: 'Page not found!',
        name: 'Chris Garrett'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
});