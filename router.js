const router = require('express').Router()

router.get('/', (req, res) => { res.render('index', {title: 'Home', navbar: 'MX'}) })

router.post('/zipcodes', (req, res) => {

    var {state, city, municipality, colony} = req.body
    var zipcodes = require(`${__dirname}/data/${state}.json`)
    var nameitem = Object.keys(zipcodes)[0]
    zipcodes = zipcodes[nameitem]

    if(city != '') {
        city = city.toLowerCase()
        zipcodes = zipcodes.filter(item => {
            if(item.d_ciudad && item.d_ciudad.toLowerCase().includes(city)) return true
            return false
        })
    }

    if(municipality != '') {
        municipality = municipality.toLowerCase()
        zipcodes = zipcodes.filter(item => {
            if(item.D_mnpio && item.D_mnpio.toLowerCase().includes(municipality)) return true
            return false
        })
    }
    
    if(colony != '') {
        colony = colony.toLowerCase()
        zipcodes = zipcodes.filter(item => {
            if(item.d_asenta && item.d_asenta.toLowerCase().includes(colony)) return true
            return false
        })
    }

    var zipobject = {}

    zipcodes.forEach(item => {
        if(!zipobject[item.d_codigo+'']) 
            zipobject[item.d_codigo+''] = item
    })

    var zipfilter = []
    var keys = Object.keys(zipobject)
    keys.forEach(key => { zipfilter.push(zipobject[key]) })

    res.status(200).send({
        success: true,
        zipcodes: zipcodes,
        zipfilter: zipfilter
    })
})

module.exports = router