const router = require('express').Router()

var States = [
    "Aguascalientes",
    "Baja California Sur",
    "Baja California",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Ciudad de México",
    "Coahuila de Zaragoza",
    "Colima",
    "Durango",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "México",
    "Michoacán de Ocampo",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca de Juárez",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz de Ignacio de la Llave",
    "Yucatán",
    "Zacatecas"
]

router.get('/', (req, res) => { res.render('index', {title: 'Postales', navbar: 'IvanBM'}) })

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

router.post('/zipcode', (req, res) => {

    const {zipcode} = req.body

    var states_json = []
    States.forEach(state => { states_json.push(require(`${__dirname}/data/${state}.json`)) })

    var zipresp = []

    states_json.forEach(state_json => {
        const state_name = Object.keys(state_json)[0]
        state_json[state_name].forEach(itemzip => {
            if(itemzip.d_codigo == zipcode) zipresp.push(itemzip)
        })
    })

    var zipobject = {}

    zipresp.forEach(item => {
        if(!zipobject[item.d_codigo+'']) 
            zipobject[item.d_codigo+''] = item
    })

    var zipfilter = []
    var keys = Object.keys(zipobject)
    keys.forEach(key => { zipfilter.push(zipobject[key]) })

    res.send({
        success: true,
        zipcodes: zipresp,
        zipfilter: zipresp[0]
    })
})

module.exports = router