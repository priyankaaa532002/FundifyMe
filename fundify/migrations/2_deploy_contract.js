const funds = artifacts.require("FundRaising");
module.exports = function(deployer) {
    deployer.deploy(funds);
};