

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var mongoUrl ='mongodb://localhost:27017/db1';
//MongoClient.connect("mongodb://localhost:27017/db1", { useNewUrlParser: true })
var ObjectID =require('mongodb').ObjectID;
var db=null;
var dbName='db1';
var app = express();
var port = process.env.PORT || 3000;
/*
var schedule1={schedule:
[
  {
    scheduletime:'8:00',
    slots:[
      Moneday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}
    ]
  },
  {
    scheduletime:'9:00',
    slots:[
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}
    ]
  },
  {
    scheduletime:'10:00',
    slots:[
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}

    ]
  },
  {
    scheduletime:'11:00',
    slots:[
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}

    ]
  },
  {
    scheduletime:'12:00',
    slots:[
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}

    ]
  },
  {
    scheduletime:'13:00',
    slots:[
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}

    ]
  },
  {
    scheduletime:'14:00',
    slots:[
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}

    ]
  },
  {
    scheduletime:'15:00',
    slots:[
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}

    ]
  },
  {
    scheduletime:'16:00',
    slots:[
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}

    ]
  },
  {
    scheduletime:'17:00',
    slots:[
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}

    ]
  },
  {
    scheduletime:'18:00',
    slots:[
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}

    ]
  },
  {
    scheduletime:'19:00',
    slots:[
      Monday:{class:"", location:"" , time:""},
      Tuesday:{class:"", location:"" , time:""},
      Wednesday:{class:"", location:"" , time:""},
      Thrusday:{class:"", location:"" , time:""},
      Friday:{class:"", location:"" , time:""}
    ]
  }
]};
*/



app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());

app.use(express.static('public'));
/*
app.get('/', function (req, res, next) {
  var schedule=db.collection("table");
  
  //console.log("table",schedule);
  //res.status(200).render('table',schedule);

});
*/

app.get('/', function (req, res, next) {
  var collection = db.collection('table');
  collection.find({}).toArray(function (err, table) {
    debugger;
    if (err) {
      res.status(500).send({
        error: "Error fetching table from DB"
      });
    } else {
      console.log("== table:", JSON.stringify(table[0].schedule));
      res.status(200).render('table',{schedule:table[0].schedule.schedule});
    }
  });
});



app.post('/inputs',function (req, res, next){
  if(req.body){
    var collection = db.collection('table');
    var inputs={schedule:req.body}
    debugger;
    collection.updateOne({"_id" : ObjectID("5cfec82b14aaafcac001e2a0")},{$set:{"schedule":inputs.schedule}},
    function (err, result){
      if (err) {
        res.status(500).send({error: "Error inserting inputs into DB"});
      }
      else{
        collection.find({}).toArray(function (err, table) {
          debugger;
          if (err) {
            res.status(500).send({
              error: "Error fetching table from DB"
            });
          } else {
            console.log("== table:", JSON.stringify(table[0].schedule));
            res.status(200).render('table',{schedule:table[0].schedule});
          }
        });
      }
    });
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
/*
app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
*/
MongoClient.connect(mongoUrl,{ useNewUrlParser: true },function (err, client) {
  if (err) {
    throw err;
  }
  db=client.db(dbName);
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
});
