import { IBlockchainEntity, IUsageTop } from 'multirpc-sdk';

import { ChainNamesMap } from './getChainNamesMap';

export const mapChainCallsData = ({
  chainCallsData,
  totalRequestsNumber,
  chainNamesMap,
  blockchains,
}: {
  chainCallsData?: IUsageTop;
  totalRequestsNumber: number;
  chainNamesMap: ChainNamesMap;
  blockchains?: IBlockchainEntity[];
}) => {
  const mappedChains =
    chainCallsData?.elements?.map(element => {
      const currentBlockchain = blockchains?.find(
        blockchain => blockchain.id === element.name,
      );
      const name =
        chainNamesMap[element.name] || currentBlockchain?.name || element.name;
      const value = element.count / totalRequestsNumber;

      return {
        name,
        value,
      };
    }) || [];

  return mappedChains;
};
