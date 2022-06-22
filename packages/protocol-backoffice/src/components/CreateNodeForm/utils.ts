import { BlockchainType, IBlockchainEntity } from 'multirpc-sdk';

export type TSelectBlockchainOption = {
  name: IBlockchainEntity['name'];
  code: string;
};

export const makeSelectBlockchainOptions = (
  blockchains: IBlockchainEntity[],
): TSelectBlockchainOption[] => {
  return (
    blockchains
      .filter(blockchain => blockchain.type !== BlockchainType.Extension)
      // * use avalanche's id instead of  paths[0] as the latter is [] for this case only
      .map(({ name, paths, id }) => ({ name, code: paths?.[0] || id }))
  );
};
