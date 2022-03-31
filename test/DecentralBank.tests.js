
const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD')
const DecentralBank = artifacts.require('DecentralBank');

require('chai').use(require('chai-as-promised')).should();

contract('DecentralBank', ([owner, investor]) =>{
    let tether, rwd, decentralBank;

    // helper function
    // convert ether into wei
    function tokens(stringNum){
        return web3.utils.toWei(stringNum, 'ether');
    }

    before( async() =>{
        // load contracts
        tether = await Tether.new();
        rwd = await RWD.new();
        decentralBank = await DecentralBank.new(tether.address, rwd.address);

        // transfer 1000000 RWD tokens to DecentralBank 
        await rwd.transfer(decentralBank.address, tokens('1000000'));

        // transfer 100 USDT (Mock Tether) to investor account (second Ganache account)
        await tether.transfer(investor, tokens('100'), {from: owner});
    });

    describe('Mock Tether Deployment', async() => {
        it('Matches name successfully', async () => {
            const name = await tether.name();
            assert.equal(name, 'Mock Tether Contract');
        });
    });

    describe('RWD Deployment', async() => {
        it('Matches name successfully', async () => {
            const name = await rwd.name();
            assert.equal(name, 'Reward Token');
        });
    });

    describe('Decentral Bank Deployment', async() => {
        it('Matches name successfully', async () => {
            const name = await decentralBank.name();
            assert.equal(name, 'Decentral Bank');
        });

        it('Contract has RWD tokens', async () => {
            let balance = await rwd.balanceOf(decentralBank.address);
            assert.equal(balance, tokens('1000000'));
        });

    });

});
