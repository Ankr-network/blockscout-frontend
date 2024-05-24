import Web3 from 'web3';

export interface IGetTxBlockConfirmationsParams {
  txHash: string;
  web3: Web3;
}

export const getTxBlockConfirmations = async ({
  txHash,
  web3,
}: IGetTxBlockConfirmationsParams) => {
  const tx = await web3.eth.getTransaction(txHash);

  if (!tx) {
    return 0;
  }

  const txReceipt = await web3.eth.getTransactionReceipt(txHash);

  if (!txReceipt) {
    return 0;
  }

  const latestBlock = await web3.eth.getBlock('latest');

  const confirmations = txReceipt.blockNumber - latestBlock.number;

  return confirmations;
};
