import { ChainPath } from '@ankr.com/chains-list';

export interface HandleSelectBlockchainParams {
  existingBlockchains: ChainPath[];
  blockchain: ChainPath;
}

const unselectBlockchain = ({
  blockchain,
  existingBlockchains,
}: HandleSelectBlockchainParams) =>
  existingBlockchains.filter(
    existingBlockchain => existingBlockchain !== blockchain,
  );

const selectBlockchain = ({
  blockchain,
  existingBlockchains,
}: HandleSelectBlockchainParams) => [...existingBlockchains, blockchain];

export const handleBlockchainSelection = ({
  blockchain,
  existingBlockchains,
}: HandleSelectBlockchainParams) => {
  const isBlockchainSelected = existingBlockchains.includes(blockchain);

  return isBlockchainSelected
    ? unselectBlockchain({ blockchain, existingBlockchains })
    : selectBlockchain({ blockchain, existingBlockchains });
};
