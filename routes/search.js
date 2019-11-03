var express = require('express');
var router = express.Router();
var request = require('request-promise')



router.get('/', function(req, res, next) {
    res.render('search', { restaurantResponse: '' });
});

router.get('/queryRestaurants', function(req, res, next) {
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

            var responseCollection = [];

            for (let index in response.restaurants) {
                var restaurant = response.restaurants[index].restaurant;

                responseCollection.push(buildRestaurant(restaurant))
            }

            console.log(JSON.stringify(responseCollection, null, 2));

            res.render('search', { restaurantResponse: responseCollection });
        })
        .catch(function (error) {
            console.log(error);
        })


    console.log(restaurantResponse);


});

function buildRestaurant (originalEntity) {
    return {
        id:originalEntity.id,
        name: originalEntity.name,
        street: originalEntity.location.address.substr(0, originalEntity.location.address.indexOf(',')),
        postalCode: originalEntity.location.zipcode,
        city: originalEntity.location.city,
        lat: originalEntity.location.latitude,
        long: originalEntity.location.longitude
    }
}

module.exports = router;
