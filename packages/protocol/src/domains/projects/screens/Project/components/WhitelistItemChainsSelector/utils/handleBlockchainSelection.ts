import { ChainPath } from 'modules/chains/types';

export interface HandleSelectBlockchainParams {
  existingBlockchains: ChainPath[];
  blockchain: ChainPath;
}

const unselectBlockchain = ({
  existingBlockchains,
  blockchain,
}: HandleSelectBlockchainParams) =>
  existingBlockchains.filter(
    existingBlockchain => existingBlockchain !== blockchain,
  );

const selectBlockchain = ({
  existingBlockchains,
  blockchain,
}: HandleSelectBlockchainParams) => [...existingBlockchains, blockchain];

export const handleBlockchainSelection = ({
  existingBlockchains,
  blockchain,
}: HandleSelectBlockchainParams) => {
  const isBlockchainSelected = existingBlockchains.includes(blockchain);

  return isBlockchainSelected
    ? unselectBlockchain({ blockchain, existingBlockchains })
    : selectBlockchain({ blockchain, existingBlockchains });
};
