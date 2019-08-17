const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/lists/";

const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;

describe("routes: items", () => {
  beforeEach((done) => {
    this.list;
    this.item;
    sequelize.sync({force: true}).then((res) => {
      List.create({
        name: "Funday Shopping"
      })
      .then((list) => {
        this.list = list;

        Item.create({
          name: "Candies",
          listId: this.list.id
        })
        .then((item) => {
          this.item = item;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
  });

  describe("POST /lists/:listId/items/create", () => {
    it("should create a new item and redirect", (done) => {
      const options = {
        url: `${base}${this.list.id}/items/create`,
        form: {
          name: "Chocolate"
        }
      };

      request.post(options, (err, res, body) => {
        Item.findOne({ where: { name: "Chocolate" }})
        .then((item) => {
          expect(item).not.toBeNull();
          expect(item.name).toBe("Chocolate");
          expect(item.listId).not.toBeNull();
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
  });

  describe("POST /lists/:listId/items/:itemId/update", () => {
    it("should update an item with the given input", (done) => {
      const options = {
        url: `${base}${this.list.id}/items/${this.item.id}/update`,
        form: {
          name: "Fruits"
        }
      };

      request.post(options, (err, res, body) => {
        expect(err).toBeNull();
        Item.findOne({
          where: { id: this.item.id }
        })
        .then((item) => {
          expect(item.name).toBe("Fruits");
          done();
        })
        .catch((err) => {
          callback(err);
          done();
        });
      });
    });
  });

  describe("POST /lists/:listId/items/:itemId/destroy", () => {
    it("should delete the item with the associated ID", (done) => {
      expect(this.item.id).toBe(1);

      request.post(`${base}${this.list.id}/items/${this.item.id}/destroy`, (err, res, body) => {
        Item.findById(1)
        .then((item) => {
          expect(err).toBeNull();
          expect(item).toBeNull();
          done();
        })
      });
    });
  });
});
