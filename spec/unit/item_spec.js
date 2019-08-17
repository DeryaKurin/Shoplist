const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;

describe("Item", () => {

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
          name: "Banana",
          listId: this.list.id
        })
        .then((item) => {
          this.item = item;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  describe("#create()", () => {
    it("should create an item with a name and assigned list", (done) => {
      Item.create({
        name: "Gardening",
        listId: this.list.id
      })
      .then((item) => {
        expect(item.name).toBe("Gardening");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create an item with the missing name or assigned list", (done) => {
      Item.create({
        name: "Orange"
      })
      .then((item) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Item.listId cannot be null");
        done();
      })
    })
  });

  describe("#setList()", () => {
    it("should associate an item with a list together", (done) => {
      List.create({
        name: "Grocery Shopping"
      })
      .then((newList) => {
        expect(this.item.listId).toBe(this.list.id);
        this.item.setList(newList)
        .then((item) => {
          expect(item.listId).toBe(newList.id);
          done();
        });
      });
    });
  });

  describe("#getList()", () => {
    it("should return the associated list", (done) => {
      this.item.getList()
      .then((associatedList) => {
        expect(associatedList.name).toBe("Funday Shopping");
        done();
      });
    });
  });
});
