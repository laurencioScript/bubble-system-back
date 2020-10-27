const express = require("express");
const Characteristic = require("./characteristicDAL");
const router = express.Router();
const JWT = require("./../../../jwt/authConfig");
const Joi = require("joi");
const { isUuid } = require("uuidv4");
const uuidV4 = require("uuid/v4");
router.use(JWT.getMiddleware);

router.get("/", async (req, res) => {
  try {
    JWT.hasPermissions(req, res, 1);

    const SchemaCharac = Joi.object().keys({
      name: Joi.string().min(1).max(30).lowercase(),
      limit: Joi.number().integer().min(0),
      offset: Joi.number().integer().min(0),
    });

    const resultValidate = Joi.validate(req.query, SchemaCharac);

    if (resultValidate.error !== null) {
      return res
        .status(400)
        .send({ error: resultValidate.error.details[0].message });
    }

    const { value } = resultValidate;

    value.limit = value.limit ? value.limit : 10;
    value.offset = value.offset ? value.offset : 0;

    const result = await Characteristic.getCharacteristics(value);

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
}); // List All Characteristics

router.post("/register", async (req, res) => {
  try {
    JWT.hasPermissions(req, res, 1);

    const SchemaPiece = Joi.object().keys({
      name: Joi.string().min(3).max(30).lowercase().required(),
    });

    const resultValidate = Joi.validate(req.body, SchemaPiece);

    if (resultValidate.error !== null) {
      return res
        .status(400)
        .send({ error: resultValidate.error.details[0].message });
    }

    resultValidate.value.id = uuidV4();

    await Characteristic.createCharacteristic(resultValidate.value);

    return res.status(200).send(resultValidate.value);
  } catch (error) {
    console.log(error);

    if (error.detail) {
      return res.status(400).send({ error: error.detail });
    } else {
      return res.status(400).send({ error: "Has error" });
    }
  }
}); // Create Characteristic

router.get("/:id", async (req, res) => {
  try {
    JWT.hasPermissions(req, res, 1);

    const SchemaCharac = Joi.object().keys({ id: Joi.string().required() });

    const resultValidate = Joi.validate(req.params, SchemaCharac);

    if (resultValidate.error !== null) {
      return res
        .status(400)
        .send({ error: resultValidate.error.details[0].message });
    }

    if (!isUuid(resultValidate.value.id)) {
      return res.status(400).send({ error: "The id is not valid" });
    }

    const result = await Characteristic.getCharacteristic(
      resultValidate.value.id
    );

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
}); //List One Characteristic

router.put("/:id", async (req, res) => {
  try {
    JWT.hasPermissions(req, res, 1);

    const SchemaCharac = Joi.object().keys({
      id: Joi.string().required(),
      name: Joi.string().min(1).max(30).lowercase(),
    });

    const resultValidate = Joi.validate(
      { id: req.params.id, ...req.body },
      SchemaCharac
    );

    if (resultValidate.error !== null) {
      return res
        .status(400)
        .send({ error: resultValidate.error.details[0].message });
    }

    if (!isUuid(resultValidate.value.id)) {
      return res.status(400).send({ error: "The id is not valid" });
    }

    const result = await Characteristic.updateCharacteristic({
      id: req.params.id,
      ...req.body,
    });

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
}); //Editar Characteristic

router.delete("/:id", async (req, res) => {
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

    const result = await Characteristic.deleteCharacteristic(
      resultValidate.value.id
    );

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
}); //Deletar Characteristic

module.exports = (app) => app.use("/characteristic", router);
