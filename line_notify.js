var app = require('express')();
var request = require('request');
var bodyParser = require('body-parser');

var port = process.env.PORT || 7777;

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.send('<h1>Hello Node.js</h1>');
});

app.get('/sendtext/:message/:sid', function (req, res) {
    res.send('<h1>This is index page</h1>');
    var token = '...';
    var message = req.params.message;
    var sid = req.params.sid;
  
    request({
      method: 'POST',
      uri: 'https://notify-api.line.me/api/notify',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        'bearer': token
      },
      form: {
        message: message,
        stickerPackageId:1,
        stickerId:sid,
      }
    });
});

app.post('/sendtext', function (req, res) {
    var json = req.body;
    res.send('sended');
    var token = '...';
    var message = json.message;
    var sid = json.stickerId;

    request({
      method: 'POST',
      uri: 'https://notify-api.line.me/api/notify',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        'bearer': token
      },
      form: {
        message: message,
        stickerPackageId:1,
        stickerId:sid,
      }
    });

});

app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});
