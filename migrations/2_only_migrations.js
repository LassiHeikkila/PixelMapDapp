const PixelMapContract = artifacts.require("PixelMapContract");

module.exports = function (deployer) {
  deployer.deploy(PixelMapContract);
};
