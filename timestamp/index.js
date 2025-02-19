// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const req = require('express/lib/request');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?",(req, res) => {
  let dateParams = req.params.date;
  if (dateParams) {
    const regeDate = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
    const regeUnix = /^(\d{0,13})?$/;
    switch(typeof dateParams) {
      case "string":
        if(regeDate.test(dateParams)) {
          // date conversion
          const dateParamsModify = dateParams.split('-');

          // TO-DO
          // change this part of code because it's solution
          // it's hardcoded.
          const dateConversion = new Date(Date.UTC(dateParamsModify[0], dateParams[1], dateParams[2], 0, 0, 0));
          const dateConversionUTC = dateConversion.toUTCString()
          const dateConversionUNIX = dateConversion.valueOf()
          //
          res.json({ unix: dateConversionUNIX, utc: dateConversionUTC });
          return;
        }
        if(regeUnix.test(dateParams)) {
          // unix conversion
          const dateParamsUnix = Number(dateParams.valueOf());
          if (dateParams.length > 10) // miliseconds
            dateParams = dateParams.slice(0,10);
          const dateParamsIntConversion = Number(dateParams);
          const dateConversionUTC = new Date(dateParamsIntConversion * 1000);
          res.json({ unix: dateParamsUnix, utc: dateConversionUTC.toUTCString() });
          return;
        }
        break;
      case undefined:
      default:
        res.json({ error: "Invalid Date" });
        break;
    }
  }
  res.json({ error: "Invalid Date" });
  return;
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
