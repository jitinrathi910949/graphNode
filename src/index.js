const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('config');
const compression = require('compression');
const addRequestId = require('express-request-id');
const sequelize = require('./utils/database');
const csvReaderRoute  = require('./routes/csvReaderRoute');

  (async () => {
    try {
      console.log("connecting to db")
      await sequelize.authenticate();
      console.log("db connection successfull")
    } catch (err) {
      
        console.log("connecting to db error")
    }
    try {
      const app = express();
      app.disable('x-powered-by');
  
      app.use(cors(config.get('server.corsOptions')));
      app.use(addRequestId());
  
      app.use(bodyParser.json({limit: '5mb'}));
      app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
      app.use(compression());
  
    //   app.use('/v1/api/user', UserRoute);
      app.use('/v1/api', csvReaderRoute);
  
  
  
  
      const httpPort = config.get('server.httpPort');
    
      app.listen(httpPort, (err) => {
        if (err) {
         console.log("error while connecting to server", err);
        } else {
          console.log("server is starting at port", httpPort);
        }
      });
    } catch (err) {
        console.log("error while starting the server", err);
    }
  })();
  

module.exports = sequelize
