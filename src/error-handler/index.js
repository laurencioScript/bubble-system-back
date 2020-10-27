module.exports = function errorHandler(e,response) {
  console.log('>>> |ERROR| ',e);
  if (e && e.status && e.message) {
    return response.status(e.status).send({error:e.message});
  }
  return response.status(400).send({ error: "Has error" });
}