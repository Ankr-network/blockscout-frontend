import { Chain, ChainID } from '@ankr.com/chains-list';

import { checkPrivateChainsAndGetChainId } from 'domains/chains/screens/ChainItem/components/UsageDataSection/const';

export type ChainNamesMap = Record<string, string>;

const flatChains = (chains: Chain[]): Chain[] =>
  chains.flatMap(chain => [
    chain,
    ...flatChains(chain.extenders || []),
    ...flatChains(chain.extensions || []),
    ...flatChains(chain.opnodes || []),
    ...flatChains(chain.testnets || []),
    ...flatChains(chain.devnets || []),
  ]);

export const getChainNamesMap = (chains: Chain[] = []) => {
  const flatten = flatChains(chains);

  return flatten.reduce<ChainNamesMap>((result, { id, name }) => {
    const checkedID = checkPrivateChainsAndGetChainId(id);

    result[checkedID] = name;

    if (checkedID === ('sei_testnet' as ChainID)) {
      result[checkedID] = 'Sei Testnet Tendermint';
    }

    if (checkedID === ('zetachain_tendermint_testnet' as ChainID)) {
      result[checkedID] = name
        .split(' ')
        .filter(word => word !== 'RPC')
        .join(' ');
    }

    if (checkedID === ChainID.SEI) {
      result[checkedID] = 'Sei Tendermint';
    }

    if (checkedID === ('kava_rpc' as ChainID)) {
      result[checkedID] = 'Kava Tendermint';
    }

    if (checkedID === ChainID.SECRET) {
      result[checkedID] = 'Secret Network Tendermint';
    }

    if (checkedID === ChainID.ALLORA_TESTNET) {
      result[checkedID] = 'Allora Testnet Tendermint';
    }

    return result;
  }, {});
};
