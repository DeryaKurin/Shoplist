const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/lists/";

const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;

describe("routes : lists", () => {
  beforeEach((done) => {
      this.list;
      sequelize.sync({force: true}).then((res) => {

       List.create({
         name: "Sunday shopping"
       })
        .then((list) => {
          this.list = list;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
  });

  describe("GET /lists", () => {

    it("should return a status code 200, all the lists and a new list form", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Lists");
        expect(body).toContain("New List");
        expect(body).toContain("Sunday shopping");
        done();
      });
    });

  });

  describe("POST /lists/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        name: "Funday Shopping"
      }
    };

    it("should create a new List and redirect", (done) => {
      request.post(options, (err, res, body) => {
        List.findOne({ where: {name: "Funday shopping" }})
        .then((list) => {
          expect(list.name).toBe("Funday Shopping");
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
  });

  describe("GET /lists/:id", () => {
    it("should render a view with the selected list", (done) => {
      request.get(`${base}${this.list.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sunday shopping");
        done();
      });
    });
  });

  describe("POST /lists/:id/destroy", () => {
    it("should delete the list with the associated ID", (done) => {
      List.all()
      .then((lists) => {
        const listCountBeforeDelete = lists.length;

        expect(listCountBeforeDelete).toBe(1);

        request.post(`${base}${this.list.id}/destroy`, (err, res, body) => {
          List.all()
          .then((lists) => {
            expect(err).toBeNull();
            expect(lists.length).toBe(listCountBeforeDelete - 1);
            done();
          });
        });
      })
      .catch((err) => {
        callback(err);
      });
    });
  });

});
