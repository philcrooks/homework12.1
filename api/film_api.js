var Films = require('../data/films')
var films = new Films();
var apiRoot = "/api";

// Create a read only api for our Films using an /api/films restful route pattern

var FilmApi = function(app) {

  // Index
  app.get(apiRoot + '/films', function(req, res) {
    res.json( {data: films} );
  });

  // Get by id (array index)
  app.get(apiRoot + '/films/:id', function(req, res) {
    res.json({data: films[req.params.id - 1]});
  });

  // Add new review to a film
  app.post(apiRoot + '/films/:id/reviews', function(req, res) {
    if (films[req.params.id - 1].reviews === undefined) films[req.params.id - 1].reviews = [];
    films[req.params.id - 1].reviews.push(req.body.review);
    res.json( {data: films} );
  });

  // Add new film
  app.post(apiRoot + '/films', function(req, res) {
    films.push(req.body.film);
    res.json( {data: films} );
  });

  // Create delete route
  app.delete(apiRoot + '/films/:id', function(req, res) {
    films.splice(req.params.id - 1, 1);
    res.json( {data: films});
  })

  // Create update routes & update film
  app.put(apiRoot + '/films/:id', function(req, res) {
    films[req.params.id - 1] = req.body.film;
    res.json( {data: films});
  })
}

module.exports = FilmApi;