const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD')
const DecentralBank = artifacts.require('DecentralBank');


module.exports = async function (deployer){
    // deploy Tether contract
    await deployer.deploy(Tether);
    //const tether = await Tether.deployed();
    // deploy RDW contract
    await deployer.deploy(RWD);
    // deploy DecentralBank contract
    await deployer.deploy(DecentralBank);
}
