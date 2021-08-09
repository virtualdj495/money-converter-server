var http = require('https');
var xml2js = require('xml2js');
var express = require('express');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
  
    next();
  });

app.get('/', (req, res) => {

    res.json(json.DataSet.Body[0].Cube[0].Rate);
    
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

var json;
var request = http.request("https://www.bnr.ro/nbrfxrates.xml", function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
       xml2js.parseString(data, function(err, result){
            json = result;
            
       });
    });
});
request.on('error', function (e) {
    console.log(e.message);
}); 
request.end();