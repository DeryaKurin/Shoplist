const listQueries = require("../db/queries.lists.js");

module.exports = {
  index(req, res, next) {
    listQueries.getAllLists((err, lists) => {
      if(err) {
        res.redirect(500, "static/index");
      } else {
        res.render("lists/index", { lists });
      }
    })
  },

  create(req, res, next) {
    let newList = {
      name: req.body.name
    };

    listQueries.createList(newList, (err, list) => {
      if(err) {
        req.flash("notice", "Upps! A problem occured, try again!");
        res.redirect(500, "/lists/index");
      } else {
        res.redirect(303, `/lists/${list.id}`);
      }
    });
  },

  show(req, res, next) {
    listQueries.getList(req.params.id, (err, list) => {
      console.log("LOOK: WE CANNOT SHOR THE LIST");
      if(err || list == null) {
        res.redirect(404, "/");
      } else {
        console.log("LOOK WE WENT IN SHOW LIST");
        res.render("lists/show", {list});
      }
    });
  },

  destroy(req, res, next) {
    listQueries.delete(req.params.id, (err, list) => {
      if(err) {
        res.redirect(500, `/lists/${req.params.id}`);
      } else {
      res.redirect(303, "/lists");
      }
    });
  }
}
