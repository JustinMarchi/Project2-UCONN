const db = require("../models");

module.exports = function(app) {
  app.get("/api/users", function(req, res){
    db.User.findAll({
      include: [db.Post]
    }).then(function(dbUser){
      res.json(dbUser.map(({dataValues}) => {
        delete dataValues.password;

        return dataValues;
      }));
    });
  });

  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};