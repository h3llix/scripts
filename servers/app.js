const express = require("express")

const PORT = process.env.PORT || 5000


function serverData(req, res) {
   var response = {}
   response["url"] = req.url
   response["headers"] = req.headers
   response["body"] = req.body
   response["port"] = req.socket.remotePort
   return response
}
    const app = express()
    var bodyParser = require('body-parser');
    app.use(bodyParser.json({limit: '50mb'}))
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: '50mb', extended: false}));
    //app.use(function(req,res,next){setTimeout(next,100)});
    app.all('/', (req, res) => {
      res.send(serverData(req,res))
    })
    app.all('/:id', (req, res) => {
      res.send(serverData(req,res))
    })

    app.listen(PORT, function () {
      console.log(`Express server listening on port ${PORT} and worker ${process.pid}`)
    })
