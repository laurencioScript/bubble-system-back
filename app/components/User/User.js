const express = require("express");
const User = require("./userDAL");
const JWT = require("./../../../jwt/authConfig");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { isUuid } = require("uuidv4");
const uuidV4 = require("uuid/v4");

router.use(JWT.getMiddleware);

// Create User
router.post("/register", async (req, res) => {
  try {
    JWT.hasPermissions(req, res, 2);

    const SchemaUser = Joi.object().keys({
      name: Joi.string().min(3).max(30).lowercase().required(),
      password: Joi.string().min(8).max(30).required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      level: Joi.number().integer().min(1).max(3).required(),
    });

    const resultValidate = Joi.validate(req.body, SchemaUser);

    if (resultValidate.error !== null) {
      return res
        .status(400)
        .send({ error: resultValidate.error.details[0].message });
    }

    if (
      resultValidate.value.level <= req.userLevel ||
      resultValidate.value.level == 1
    ) {
      return res.status(400).send({ error: "you do not have permission" });
    }

    resultValidate.value.password = await bcrypt.hash(
      resultValidate.value.password,
      10
    );

    resultValidate.value.id = uuidV4();

    await User.createUsers(resultValidate.value);

    resultValidate.value.password = undefined;

    return res.status(200).send(resultValidate.value);
  } catch (error) {
    if (error.detail) {
      return res.status(400).send({ error: error.detail });
    } else {
      return res.status(400).send({ error: "Has error" });
    }
  }
});

// List All Users
router.get("/", async (req, res) => {
  try {
    JWT.hasPermissions(req, res, 2);

    const SchemaUser = Joi.object().keys({
      limit: Joi.number().integer().min(0),
      offset: Joi.number().integer().min(0),
      name: Joi.string().min(1).max(30).lowercase(),
      level: Joi.number().integer().min(1).max(3),
    });

    const resultValidate = Joi.validate(req.query, SchemaUser);

    if (resultValidate.error !== null) {
      return res
        .status(400)
        .send({ error: resultValidate.error.details[0].message });
    }

    const { value } = resultValidate;

    value.limit = value.limit ? value.limit : 10;
    value.offset = value.offset ? value.offset : 0;

    const result = await User.getUsers(value);
    if (result.rowCount < 1) {
      return res.status(404).send({ error: "Not found" });
    }

    return res.status(200).send({ result: result.rows });
  } catch (error) {
    console.log("LOG", error);

    if (error.detail) {
      return res.status(400).send({ error: error.detail });
    }

    return res.status(400).send({ error: "Has error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const SchemaUser = Joi.object().keys({ id: Joi.string().required() });

    const resultValidate = Joi.validate(req.params, SchemaUser);

    if (resultValidate.error !== null) {
      return res
        .status(400)
        .send({ error: resultValidate.error.details[0].message });
    }

    if (!isUuid(resultValidate.value.id)) {
      return res.status(400).send({ error: "The id is not valid" });
    }

    const result = await User.getUser(resultValidate.value.id);

    if (result.rowCount < 1) {
      return res.status(404).send({ error: "Not found" });
    }

    return res.status(200).send({ result: result.rows });
  } catch (error) {
    console.log("LOG", error);

    if (error.detail) {
      return res.status(400).send({ error: error.detail });
    }

    return res.status(400).send({ error: "Has error" });
  }
}); //List One User

router.put("/:id", async (req, res) => {
  try {
    const SchemaUser = Joi.object().keys({
      id: Joi.string().required(),
      name: Joi.string().min(3).max(30).lowercase(),
      password: Joi.string().min(8).max(30).required(),
      email: Joi.string().email({ minDomainAtoms: 2 }),
      level: Joi.number().integer().min(1).max(3).required(),
    });

    const resultValidate = Joi.validate(
      { id: req.params.id, ...req.body },
      SchemaUser
    );

    if (resultValidate.error !== null) {
      return res
        .status(400)
        .send({ error: resultValidate.error.details[0].message });
    }

    if (!isUuid(resultValidate.value.id)) {
      return res.status(400).send({ error: "The id is not valid" });
    }

    if (resultValidate.value.password != "") {
      resultValidate.value.password = await bcrypt.hash(
        resultValidate.value.password,
        10
      );
    }

    // Se o level do usuario for maior que o parametro level que ele quer usar
    // vai dar ERROR ou ele tenta transformar uma conta ADM ou Atendente em conta Mestre
    if (
      (req.userId != resultValidate.value.id &&
        req.userLevel >= resultValidate.value.level) ||
      resultValidate.value.level == 1
    ) {
      return res.status(400).send({ error: "You do not have permission" });
    }

    const result = await User.updateUser(resultValidate.value);

    if (result.rowCount < 1) {
      return res.status(404).send({ error: "Not found" });
    }

    resultValidate.value.password = undefined;

    return res.status(200).send({ result: resultValidate.value });
  } catch (error) {
    console.log("LOG", error);

    if (error.detail) {
      return res.status(400).send({ error: error.detail });
    }

    return res.status(400).send({ error: "Has error" });
  }
}); //Editar

router.delete("/:id", async (req, res) => {
  try {
    JWT.hasPermissions(req, res, 2);

    const SchemaUser = Joi.object().keys({ id: Joi.string().required() });

    const resultValidate = Joi.validate(req.params, SchemaUser);

    if (resultValidate.error !== null) {
      return res
        .status(400)
        .send({ error: resultValidate.error.details[0].message });
    }

    if (!isUuid(resultValidate.value.id)) {
      return res.status(400).send({ error: "The id is not valid" });
    }

    let user = await User.getUser(resultValidate.value.id);
    user = user.rows[0];

    if (req.userLevel >= user.level_user || user.level_user == 1) {
      return res.status(400).send({ error: "You do not have permission" });
    }

    const result = await User.deleteUser(resultValidate.value.id);

    if (result.rowCount < 1) {
      return res.status(404).send({ error: "Not found" });
    }

    return res.status(200).send({ result: resultValidate.value });
  } catch (error) {
    if (error.detail) {
      return res.status(400).send({ error: error.detail });
    }

    return res.status(400).send({ error: "Has error" });
  }
}); //Deletar

router.put("/resetPassword/:id", async (req, res) => {
  try {
    JWT.hasPermissions(req, res, 2);

    const SchemaUser = Joi.object().keys({ id: Joi.string().required() });

    const resultValidate = Joi.validate(req.params, SchemaUser);

    if (resultValidate.error !== null) {
      return res
        .status(400)
        .send({ error: resultValidate.error.details[0].message });
    }

    if (!isUuid(resultValidate.value.id)) {
      return res.status(400).send({ error: "The id is not valid" });
    }

    let user = await User.getUser(resultValidate.value.id);
    user = user.rows[0];

    if (req.userLevel >= user.level_user || user.level_user == 1) {
      return res.status(400).send({ error: "You do not have permission" });
    }

    const result = await User.resetPassword(resultValidate.value.id);

    if (result.rowCount < 1) {
      return res.status(404).send({ error: "Not found" });
    }

    return res.status(200).send({ result });
  } catch (error) {
    if (error.detail) {
      return res.status(400).send({ error: error.detail });
    }
    return res.status(400).send({ error: "Has error" });
  }
});

module.exports = (app) => app.use("/user", router);
