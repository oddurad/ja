var express = require('express');
var request = require('request');
var corser = require('corser');

var app = express();
app.use(corser.create());
var PORT = 5000;

app.get('/search', function (req, res) {
  var options = {
    url: 'https://api.ja.is/search/v6/',
    headers: {
      'Authorization': 'YOUR_API_KEY'
    },
    qs: {
      'q': req.query.q
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var results = JSON.parse(body);
      res.send(results);
    } else {
      res.status(response.statusCode).send(body);
    }
  }

  request(options, callback);
});

app.listen(PORT, function () {
  console.log('Já API listening on port ' + PORT);
});
