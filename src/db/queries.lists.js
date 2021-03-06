const List = require("./models").List;
const Item = require("./models").Item;

module.exports = {

  getAllLists(callback) {
    return List.all()

    .then((lists) => {
      callback(null, lists);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getList(id, callback) {
    return List.findById(id, {
      include: [{
        model: Item,
        as: "items"
      }]
    })
    .then((list) => {
      callback(null, list);
    })
    .catch((err) => {
      callback(err);
    })
  },

  createList(newList, callback) {
    return List.create({
      name: newList.name
    })
    .then((list) => {
      callback(null, list);
    })
    .catch((err) => {
      callback(err);
    })
  },

  delete(id, callback) {
    return List.findById(id)
    .then((list) => {
      list.destroy()
      .then((res) => {
        callback(null, list);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }
}
