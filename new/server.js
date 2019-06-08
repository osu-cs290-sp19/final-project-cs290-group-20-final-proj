

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');


var mongoUrl ='mongodb://localhost:27017/db1';

var db = null;

var app = express();
var port = process.env.PORT || 3000;
var schedule={_schedule:
[
  {
    scheduletime:'8:00',
    slots:{
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}
    }
  },
  {
    scheduletime:'9:00',
    slots:{
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}}
  },
  {
    scheduletime:'10:00',
    slots:{
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}

    }
  },
  {
    scheduletime:'11:00',
    slots:{
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}

    }
  },
  {
    scheduletime:'12:00',
    slots:{
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}

    }
  },
  {
    scheduletime:'13:00',
    slots:{
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}

    }
  },
  {
    scheduletime:'14:00',
    slots:{
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}

    }
  },
  {
    scheduletime:'15:00',
    slots:{
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}

    }
  },
  {
    scheduletime:'16:00',
    slots:{
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}

    }
  },
  {
    scheduletime:'17:00',
    slots:{
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}

    }
  },
  {
    scheduletime:'18:00',
    slots:{
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}

    }
  },
  {
    scheduletime:'19:00',
    slots:{
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}
    }
  }
]};


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function (req, res, next) {
  res.status(200).render('table',schedule);
});


app.post('/inputs',function (req, res, next){
  if(req.body){
 
    res.status(200).render('table',req.body);
  }
  else{
    res.status(400).send({
    error: "Wrong"
  });
  }
});




app.get('*', function (req, res){
  res.render('404');
})
app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
/*
MongoClient.connect(mongoUrl, function (err, client) {
  if (err) {
    throw err;
  }
  db = client.db(mongoDBName);
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
});
*/