module.exports = {
    getAllUsers: (req, res, next) => {
        req.app.get('db').get_all_users().then(users => {
            res.status(200).send(users);
        }).catch((err) => {console.log(err)})
    },

    getAllVehicles: (req, res, next) => {
        req.app.get('db').get_all_vehicles().then(vehicles => {
            res.status(200).send(vehicles);
        }).catch((err) => {console.log(err)})
    },

    addUsers: (req, res, next) => {
        let {name, email} = req.body
        req.app.get('db').add_user([name, email]).then(post => {
            res.status(200).send(post);
        }).catch((err) => {console.log(err)})
    },

    addVehicles: (req, res, next) => {
        let {make, model, year, owner_id} = req.body
        req.app.get('db').add_vehicle([make, model, year, owner_id]).then(vehicles => {
            res.status(200).send(vehicles);
        }).catch((err) => {console.log(err)})
    },

    getVehicleCount: (req, res, next) => {
        req.app.get('db').count_vehicle(req.params.userId).then(id => {
            res.status(200).send(id);
        }).catch((err) => {console.log(err)})
    },

    getByOwner: (req, res, next) => {
        req.app.get('db').get_vehicles_by_id(req.params.userId).then(vehicle_id => {
            res.status(200).send(vehicle_id);
        }).catch((err) => {console.log(err)})
    },

    getVehicleByQuery: (req, res, next) => {
        if (req.query.userEmail) {
            return req.app.get('db').email_by_vehicle([req.query.userEmail]).then(id => {
                return res.status(200).json(id);
            }).catch((err) => {console.log(err)})
        }
        if (req.query.userFirstStart) {
            return req.app.get('db').by_user_letter([req.query.userFirstStart + "%"]).then(id => {
                return res.status(200).json(id);
            }).catch((err) => {console.log(err)})
        }
    },

    getNewerVehicles: (req, res, next) => {
        const db = req.app.get("db");
        db.getNewerVehicles().then(result => {
            res.json(result);
        });
    },

    changeOwner: (req, res) => {
        const db = req.app.get('db');
        db.changeOwner([req.params.vehicleId, req.params.userId]).then(result => {
            res.json(result);
        });
    },

    deleteVehicle: (req, res) => {
        const db = req.app.get("db");
        db.deleteVehicle([req.params.vehicleId]).then(result => {
          res.json(result);
        });
      },

      deleteOwner: (req, res) => {
          const db = req.app.get("db");
          db.deleteOwner([req.params.vehicleId]).then(result => {
              res.json(result);
          });
      }
}