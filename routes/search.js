var express = require('express');
var router = express.Router();
var request = require('request-promise')



router.get('/', function(req, res, next) {
    res.render('search', { restaurantResponse: '' });
});

router.get('/queryRestaurants', function(req, res, next) {

    var restaurantResponse = 'null';

    // request.get('https://developers.zomato.com/api/v2.1/search?entity_id=76&entity_type=city&q=popeye',
    //     {headers: {"user-key": "8705c868fa6b25015d4fef4f6b8c3a7e"}},
    //     (err, res, body) => {
    //     if (err) {
    //         return console.log(err);
    //     }
    // });

    var options = {
        method: 'GET',
        uri: 'https://developers.zomato.com/api/v2.1/search?entity_id=76&entity_type=city&q=popeye',
        headers:{
            "user-key": "8705c868fa6b25015d4fef4f6b8c3a7e"
        },
        json: true
    }

    restaurantResponse = request(options)
        .then(function (response) {
            res.render('search', { restaurantResponse: JSON.stringify(response, null, 2) });
        })
        .catch(function (error) {
            console.log(error);
        })


    console.log(restaurantResponse);


});

module.exports = router;
