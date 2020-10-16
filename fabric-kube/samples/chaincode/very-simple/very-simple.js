const shim = require('fabric-shim');
const logger = shim.newLogger('chaincode');

const Chaincode = class {
  async Init() {
    logger.info("very-simple init", "");
    return shim.success();
  }

  async Invoke(stub) {
    const ret = stub.getFunctionAndParameters();
    logger.info(ret);

    const method = this[ret.fcn];
    if (!method) {
      logger.info(`no function of name:${ret.fcn} found`);
      return shim.error(`Received unknown function ${ret.fcn} invocation`);
    }
    try {
      const payload = await method(stub, ret.params);
      return shim.success(payload);
    } catch (err) {
      logger.info(err);
      return shim.error(err);
    }
  }
  
  async ping() {
    logger.info("ping called", "");
    const answer = { ping: 'pong' };

    // get the transient maplet transientMarble = stub.getTransient();// convert into buffer
    // var buffer = new Buffer(transientMarble.map.conversation.value.toArrayBuffer());// from buffer into string
    // var JSONString = buffer.toString("utf8");// from json string into object
    var JSONObject = JSON.parse(JSONString);
    await stub.putPrivateData("collectionAdres", "1231123123", answer);

    return Buffer.from(JSON.stringify(answer), 'utf8');
  }
};

module.exports = Chaincode;
