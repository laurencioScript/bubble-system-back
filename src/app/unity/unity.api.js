const { isUuid } = require("uuidv4");
const { Router } = require("express");
const router = Router();
const Joi = require("joi");

const unityService = require("./unity.service");
// const JWT = require("./../../jwt");
const errorHandler = require("./../../error-handler");

// router.use(JWT.getMiddleware);

router.get("/", async (req, res) => {
  try {

    // JWT.hasPermissions(req, res, 1);

    const query = req.query;

    const Schema = Joi.object().keys({
      name: Joi.string().min(1).max(30).lowercase(),
    });

    const validationResult = Joi.validate(query, Schema);

    if (validationResult.error) {
      throw {
        status: 400,
        message: validationResult.error.details
      }      
    }

    const unitys = await unityService.getUnitys(query);

    return res.status(200).send(unitys);
    
  } catch (error) {
    return errorHandler(error,res);
  }
}); 

router.post("/", async (req, res) => {
  try {

    // JWT.hasPermissions(req, res, 1);

    const body = req.body;
    
    const Schema = Joi.object().keys({
      name: Joi.string().min(1).max(30).lowercase().required(),
    });

    const validationResult = Joi.validate(body, Schema);

    if (validationResult.error) {
      throw {
        status: 400,
        message: validationResult.error.details
      }      
    }

    
    const unity = await unityService.createUnity(body);

    return res.status(200).send(unity);

  } catch (error) {
    return errorHandler(error,res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    
    // JWT.hasPermissions(req, res, 1);

    const {id} = req.params;

    if(!isUuid(id)){
      throw {
        status: 400,
        message: "id is invalid"
      } 
    }
   
    const unity = await unityService.getUnity(id);

    return res.status(200).send(unity);
  } catch (error) {
    return errorHandler(error,res);
  }
});

router.put("/:id", async (req, res) => {
  try {
    
    // JWT.hasPermissions(req, res, 2);

    const {id} = req.params;
    const body = req.body;

    if(!isUuid(id)){
      throw {
        status: 400,
        message: "id is invalid"
      } 
    }
    
    const Schema = Joi.object().keys({
      name: Joi.string().min(1).max(30).lowercase(),
    });

    const validationResult = Joi.validate(body, Schema);

    if (validationResult.error) {
      throw {
        status: 400,
        message: validationResult.error.details
      }      
    }

    const unity = await unityService.updateUnity({id,...body});

    return res.status(200).send(unity);

  } catch (error) {
    return  errorHandler(error,res);
  }

  
});

router.delete("/:id", async (req, res) => {
  try {

    // JWT.hasPermissions(req, res, 2);

    const {id} = req.params;

    if(!isUuid(id)){
      throw {
        status: 400,
        message: "id is invalid"
      } 
    }

    const unity = await unityService.deleteUnity(id);

    return res.status(200).send(unity);

  } catch (error) {
    return errorHandler(error,res);
  }
});

module.exports = router;
