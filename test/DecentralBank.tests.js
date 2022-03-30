const assert = require('assert');

const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD')
const DecentralBank = artifacts.require('DecentralBank');

require('chai').use(require('chai-as-promised')).should();

contract('DecentralBank', (accounts) =>{
    //let tether;

    describe('Mock Tether Deployment', async() => {
        it('Matches name successfully', async () => {
            // works both ways
            // tether = await Tether.deployed();
            let tether = await Tether.new();
            const name = await tether.name();
            assert.equal(name, 'Mock Tether Contract');
        });
    });

    describe('RWD Deployment', async() => {
        it('Matches name successfully', async () => {
            // works both ways
            // tether = await Tether.deployed();
            let rwd = await RWD.new();
            const name = await rwd.name();
            assert.equal(name, 'Reward Token');
        });
    });

});