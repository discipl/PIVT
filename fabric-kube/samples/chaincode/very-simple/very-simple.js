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
  
  async ping(stub, args) {
    logger.info("ping called", "");
    const answer = { adres: 'test' };

    const result = await stub.putPrivateData("collectionAdres", "1231123123", JSON.stringify(answer));
    logger.info("")
    return Buffer.from(JSON.stringify(result), 'utf8');
  }
};

module.exports = Chaincode;
