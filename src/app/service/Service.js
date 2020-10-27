const express = require("express");
const Service = require("./ServiceDAL");
const router = express.Router();
const JWT = require("./../../../jwt/authConfig");
const Joi = require("joi");
const { isUuid } = require("uuidv4");
const uuidV4 = require("uuid/v4");
const cryptoRandomString = require("crypto-random-string");
router.use(JWT.getMiddleware);

router.get("/", async (req, res) => {
  try {
    JWT.hasPermissions(req, res, 1);

    const SchemaDefect = Joi.object().keys({
      limit: Joi.number().integer().min(0),
      offset: Joi.number().integer().min(0),
    });

    const resultValidate = Joi.validate(req.params, SchemaDefect);

    if (resultValidate.error !== null) {
      return res
        .status(400)
        .send({ error: resultValidate.error.details[0].message });
    }

    const { value } = resultValidate;

    value.limit = value.limit ? value.limit : 10;
    value.offset = value.offset ? value.offset : 0;

    const result = await Service.getAllServices(value);

    if (result.rowCount < 1) {
      return res.status(404).send({ error: "Not found" });
    }

    return res.status(200).send({ result: result.rows });
  } catch (error) {
    console.log(error);

    if (error.detail) {
      return res.status(400).send({ error: error.detail });
    } else {
      return res.status(400).send({ error: "Has error" });
    }
  }
}); // List All Users

router.post("/register", async (req, res) => {
  try {
    JWT.hasPermissions(req, res, 2);

    const Schema = Joi.object().keys({
      date_input: Joi.allow(null),
      date_ouput: Joi.allow(null),
      date_payment: Joi.allow(null),
      date_removed: Joi.allow(null),
      rol: Joi.allow(null),
      observation: Joi.string().allow(""),
      situation: Joi.string(),
      client: Joi.object(),
      payment: Joi.object()
        .keys({
          debit_card: Joi.number(),
          credit_card: Joi.number(),
          check_pay: Joi.number(),
          money_pay: Joi.number(),
          discount: Joi.number().integer(),
          interest: Joi.number().integer(),
          amount_paid: Joi.number(),
          value_total: Joi.number(),
        })
        .required(),
      itens: Joi.array().required(),
    });

    const resultValidate = Joi.validate(req.body, Schema);

    if (resultValidate.error !== null) {
      return res
        .status(400)
        .send({ error: resultValidate.error.details[0].message });
    }

    resultValidate.value.id = uuidV4();
    resultValidate.value.rol = cryptoRandomString({
      length: 8,
      type: "distinguishable",
    });
    resultValidate.value.payment.id = uuidV4();

    const result = await Service.createService(resultValidate.value);

    return res.status(200).send(resultValidate.value);
  } catch (error) {
    console.log(error);

    if (error.detail) {
      return res.status(400).send({ error: error.detail });
    } else {
      return res.status(400).send({ error: "Has error" });
    }
  }
}); // Create User

router.get("/:id", async (req, res) => {
  try {
    JWT.hasPermissions(req, res, 1);

    const Schema = Joi.object().keys({ id: Joi.string().required() });

    const resultValidate = Joi.validate(req.params, Schema);

    if (resultValidate.error !== null) {
      return res
        .status(400)
        .send({ error: resultValidate.error.details[0].message });
    }

    if (!isUuid(resultValidate.value.id)) {
      return res.status(400).send({ error: "The id is not valid" });
    }

    const result = await Service.getOneService(resultValidate.value.id);

    if (result.rowCount < 1) {
      return res.status(404).send({ error: "Not found" });
    }

    return res.status(200).send({ result: result.rows });
  } catch (error) {
    console.log(error);

    if (error.detail) {
      return res.status(400).send({ error: error.detail });
    } else {
      return res.status(400).send({ error: "Has error" });
    }
  }
}); //List One User

router.put("/:id", async (req, res) => {
  try {
    JWT.hasPermissions(req, res, 2);

    const Schema = Joi.object().keys({
      id_service: Joi.string().required(),
      payment_id: Joi.string(),
      date_input: Joi.allow(null),
      date_ouput: Joi.allow(null),
      date_payment: Joi.allow(null),
      rol: Joi.allow(null),
      date_removed: Joi.allow(null),
      observation: Joi.allow(null),
      situation: Joi.string().allow(null),
      client: Joi.object().allow(null),
      payment: Joi.object().keys({
        id_payment: Joi.string().required(),
        debit_card: Joi.number(),
        credit_card: Joi.number(),
        check_pay: Joi.number(),
        money_pay: Joi.number(),
        discount: Joi.number().integer().allow(null),
        interest: Joi.number().integer().allow(null),
        amount_paid: Joi.number(),
        value_total: Joi.number(),
      }),
      itens: Joi.array().required(),
    });

    const resultValidate = Joi.validate(
      { id_service: req.params.id, ...req.body },
      Schema
    );

    if (resultValidate.error !== null) {
      return res
        .status(400)
        .send({ error: resultValidate.error.details[0].message });
    }

    if (!isUuid(resultValidate.value.id_service)) {
      return res.status(400).send({ error: "The id is not valid" });
    }

    const result = await Service.updateService(resultValidate.value);

    if (result.rowCount < 1) {
      return res.status(404).send({ error: "Not found" });
    }

    return res.status(200).send({ result: resultValidate.value });
  } catch (error) {
    console.log(error);

    if (error.detail) {
      return res.status(400).send({ error: error.detail });
    } else {
      return res.status(400).send({ error: "Has error" });
    }
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

    const result = await Service.deleteService(resultValidate.value.id);

    if (result.rowCount < 1) {
      return res.status(404).send({ error: "Not found" });
    }

    return res.status(200).send({ result: resultValidate.value });
  } catch (error) {
    console.log(error);

    if (error.detail) {
      return res.status(400).send({ error: error.detail });
    } else {
      return res.status(400).send({ error: "Has error" });
    }
  }
}); //Deletar

module.exports = (app) => app.use("/service", router);
