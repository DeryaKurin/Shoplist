const itemQueries = require("../db/queries.items.js");

module.exports = {
  create(req, res, next) {
    let newItem = {
      name: req.body.name,
      listId: req.params.listId
    };

    itemQueries.addItem(newItem, (err, item) => {
      if(err) {
        req.flash("notice", "Upps! A problem occured, try again!");
        res.redirect(500, `/lists/${newItem.listId}`);
      } else {
        res.redirect(303, `/lists/${newItem.listId}`)
      }
    });
  },

  update(req, res, next) {
    itemQueries.updateItem(req, req.body, (err, item) => {
      if(err || item == null) {
        console.log("ERROR:", err);
        req.flash("notice", "Upps! A problem occured, try again!");
        res.redirect(500, `/lists`);
      } else {
        console.log("EDIT WENT THROUGH");
        res.redirect(`/lists/${item.listId}`);
      }
    });
  },

  delete(req, res, next) {
    itemQueries.deleteItem(req, (err, item) => {
      if(err) {
        console.log(err);
        res.redirect(500, `/lists/${req.params.listId}`);
      } else {
        res.redirect(303, `/lists/${req.params.listId}`);
      }
    });
  },

  togglePurchase(req, res, next) {
    itemQueries.toggle(req, (err, item) => {
      if(err || item == undefined) {
        console.log(err);
        req.flash('notice', 'No item found with that ID.');
        res.redirect(500, `/lists/${req.params.listId}`);
      } else {
        console.log("LOOK HERE: WE TOGGLED PURCHASE");
        res.redirect(303, `/lists/${req.params.listId}`);
      }
    });
  }
}
