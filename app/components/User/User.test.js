const { connect } = require("./../../../database");
const request = require("supertest");
const url = "http://localhost:3000/";
const userDal = require("./userDAL");
const uuidV4 = require("uuid/v4");
const bcrypt = require("bcryptjs");

const reset = () => {
  let client = connect();
  client.query("delete FROM userx ");
  client.end();
};

const createMaster = async () => {
  let password = await bcrypt.hash("rootroot", 10);
  let result = await userDal.createUsers({
    id: uuidV4(),
    name: "root",
    email: "root@root.root",
    password,
    level: 1,
  });
};

describe("User", () => {
  let users = {
    master: {
      email: "root@root.root",
      password: "rootroot",
    },
  };

  beforeAll(async () => {
    reset();
    createMaster();
  });

  test("Login of account Master", async (done) => {
    request(url)
      .post("user/login")
      .send({
        email: users.master.email,
        password: users.master.password,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        users.master.token = res.body.result.token;
        done();
      });
  });

  test("Create account Administrator", async (done) => {
    request(url)
      .post("user/register")
      .send({
        name: "admin",
        password: "adminadmin",
        email: "admin@admin.admin",
        level: "2",
      })
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${users.master.token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        users.adm = res.body;
        users.adm.password = "adminadmin";
        done();
      });
  });

  test("Login Administrator", async (done) => {
    request(url)
      .post("user/login")
      .send({
        email: users.adm.email,
        password: users.adm.password,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        users.adm.token = res.body.result.token;
        done();
      });
  });

  test("Create account clerk", async (done) => {
    request(url)
      .post("user/register")
      .send({
        name: "atendente",
        password: "atendente",
        email: "atendente@atendente.atendente",
        level: "3",
      })
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${users.adm.token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        users.clerk = res.body;
        users.clerk.password = "atendente";
        done();
      });
  });

  test("Login clerk", async (done) => {
    request(url)
      .post("user/login")
      .send({
        email: users.clerk.email,
        password: users.clerk.password,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        users.clerk.token = res.body.result.token;
        done();
      });
  });

  test("Get All Users", async (done) => {
    request(url)
      .get("user/")
      .set("Authorization", `Bearer ${users.master.token}`)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body.result.length).toBe(3);
        done();
      });
  });

  test("Get One User", async (done) => {
    request(url)
      .get(`user/${users.adm.id}`)
      .set("Authorization", `Bearer ${users.master.token}`)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect({
          id_user: users.adm.id,
          name_user: users.adm.name,
          email: users.adm.email,
          level_user: users.adm.level,
        }).toEqual(res.body.result[0]);

        done();
      });
  });

  test("Master Reset Password of clerk ", async (done) => {
    request(url)
      .put(`user/resetPassword/${users.clerk.id}`)
      .set("Authorization", `Bearer ${users.master.token}`)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        users.clerk.password = res.body.result;
        request(url)
          .post("user/login")
          .send({
            email: users.clerk.email,
            password: users.clerk.password,
          })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            done();
          });
        done();
      });
  });

  test("Clerk update account ", async (done) => {
    request(url)
      .put(`user/${users.clerk.id}`)
      .set("Authorization", `Bearer ${users.clerk.token}`)
      .send({
        name: users.clerk.name + "2",
        password: users.clerk.name + "2",
        email: users.clerk.email + "2",
        level: users.clerk.level,
      })
      .set("Accept", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect({
          id: users.clerk.id,
          name: users.clerk.name + "2",
          email: users.clerk.email + "2",
          level: users.clerk.level,
        }).toEqual(res.body.result);
        done();
      });
  });

  test("Master delete clerk ", async (done) => {
    request(url)
      .delete(`user/${users.clerk.id}`)
      .set("Authorization", `Bearer ${users.master.token}`)
      .set("Accept", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(users.clerk.id).toEqual(res.body.result.id);
        request(url)
          .get(`user/${users.clerk.id}`)
          .set("Authorization", `Bearer ${users.master.token}`)
          .expect(404)
          .end(function (err, res) {
            if (err) return done(err);
            done();
          });
        done();
      });
  });
});
