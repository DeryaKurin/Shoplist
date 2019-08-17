const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;

describe("List", () => {
  beforeEach((done) => {
    this.list;
    this.item;
    sequelize.sync({force: true}).then((res) => {

      List.create({
        name: "Sunday Shopping"
      })
      .then((list) => {
        this.list = list;

        Item.create({
          name: "Apples",
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

describe('#create()', () => {

  it("should create a list object with a name", (done) => {

    List.create({
      name: "Books"
    })
    .then((list) => {
      expect(list.name).toBe("Books");
      done();

    })
    .catch((err) => {
      console.log(err);
      done();
    });
  });
 });

 describe('#getItems', () => {
   it("should return the associated items", (done) => {

     this.list.getItems()
     .then((associatedItems) => {
       expect(associatedItems[0].name).toBe("Apples");
       done();
     });
  });
});

});
