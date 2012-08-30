var express = require('express'),
    app = express(),
    path = require("path"),
    jadeAmd = require("jade-amd");

var productList = [
      {
        name: "tomatoes",
        price: 1
      },
      {
        name: "lettuce",
        price: 2
      }
    ];

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express["static"](path.join(__dirname, 'public')));
});

app.configure("development", function(){
  var jadeAmd = require('jade-amd');
  app.use("/templates", jadeAmd.jadeAmdMiddleware({
    views: path.join(__dirname, 'views/includes'),
    jadeRuntime: "jade-runtime"
  }));
});

app.get('/', function(req, res){
  res.render('index', {products: productList});
});

app.listen(3000);