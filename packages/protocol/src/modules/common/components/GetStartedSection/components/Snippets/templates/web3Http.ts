export const web3Http = `const Web3 = require('web3');

const url = '__url__'  // url string

const web3 = new Web3(new Web3.providers.HttpProvider(url));

web3.eth.getBlockNumber((error, blockNumber) => {
    if(!error) {
        console.log(blockNumber);
    } else {
        console.log(error);
    }
});`;
