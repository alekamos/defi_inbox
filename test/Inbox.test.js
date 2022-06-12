// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');


let accounts;
let inbox;
beforeEach(async () => {
    // get a list of all account
    accounts = await web3.eth.getAccounts();

    //user one of those account to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi initial message'] })
        .send({ from: accounts[0], gas: '1000000' })
});

describe('Inbox contract', () => {
    it('deploy contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi initial message');
    });

    it('update message', async () => {
        await inbox.methods.setMessage('bye').send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    });

});
