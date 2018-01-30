require('dotenv').config();
const express = require('express')
, bodyParser = require('body-parser')
, cors = require('cors')
, massive = require('massive');

const mainCtrl = require('./controller/mainCtrl');

    port = 3000;

    const app = express();

    app.use(bodyParser.json());
    app.use(cors());

    app.listen(port, () => {
        console.log(`Listening on Port: ${port}`);
    });

    massive(process.env.CONNECTION_STRING).then( db => {
        app.set('db', db);
        db.init_tables.user_create_seed().then( response => {
          console.log('User table init');
          db.init_tables.vehicle_create_seed().then( response => {
            console.log('Vehicle table init');
          })
        })
      })

      app.get('/api/users', mainCtrl.getAllUsers);
      app.get('/api/vehicles', mainCtrl.getAllVehicles);
      app.post('/api/users', mainCtrl.addUsers);
      app.post('/api/vehicles', mainCtrl.addVehicles);
      app.get('/api/user/:userId/vehiclecount', mainCtrl.getVehicleCount);
      app.get('/api/user/:userId/vehicle', mainCtrl.getByOwner);
      app.get('/api/vehicle', mainCtrl.getVehicleByQuery);
      app.get("/api/newervehiclesbyyear", mainCtrl.getNewerVehicles);
      app.put('/api/vehicle/:vehicleId/user/:userId', mainCtrl.changeOwner);
      app.delete("/api/vehicle/:vehicleId", mainCtrl.deleteVehicle);
      app.delete("/api/user/:userId/vehicle/:vehicleId", mainCtrl.deleteOwner);