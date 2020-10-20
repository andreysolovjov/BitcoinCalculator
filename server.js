const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { request } = require('express');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    let url = 'https://api.coindesk.com/v1/bpi/currentprice/eur.json';
    let currency = req.body.currency;

    axios.get(url).
    then(function(response){
        
        let rate;
        let code;
            if(currency === 'EUR'){
                rate = response.data.bpi.EUR.rate_float;
                code = response.data.bpi.EUR.code;
            } else {
                rate = response.data.bpi.USD.rate_float;
                code = response.data.bpi.USD.code;
            } 
        
    
        
        let disclaimer = response.data.disclaimer;
        let bitcoin = Number(req.body.bitcoin);
        res.write(`<p>  ${rate * bitcoin} ${code}</p>`);
        res.write(`<p>${disclaimer}</p>`);
        res.send();
    })
    .catch(function(error){
        console.log(error);
    });
});

app.listen(process.env.PORT || 3000, ()=> {
    console.log('Server has started.');
});