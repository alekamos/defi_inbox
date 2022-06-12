// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

beforeEach(()=> {
// get a list of all account
web3.eth.getAccounts()
    .then(fetchedAccount => {
        console.log(fetchedAccount)
    });

//user one of those account to deploy the contract
});

describe('Inbox contract', ()=>{
    it('deploy contract', ()=> {})
});
