import { Chain, ChainID } from 'domains/chains/types';
import { checkPrivateChainsAndGetChainId } from 'domains/chains/screens/ChainItem/components/UsageDataSection/const';

export type ChainNamesMap = Record<string, string>;

const flatChains = (chains: Chain[]): Chain[] =>
  chains.flatMap(chain => [
    chain,
    ...flatChains(chain.extenders ?? []),
    ...flatChains(chain.extensions ?? []),
    ...flatChains(chain.opnodes ?? []),
    ...flatChains(chain.testnets ?? []),
    ...flatChains(chain.devnets ?? []),
  ]);

export const getChainNamesMap = (chains: Chain[] = []) => {
  const flatten = flatChains(chains);
  return flatten.reduce<ChainNamesMap>((result, { id, name }) => {
    const checkedID = checkPrivateChainsAndGetChainId(id);

    result[checkedID] = name;

    if (checkedID === ('zetachain_tendermint_testnet' as ChainID)) {
      result[checkedID] = name
        .split(' ')
        .filter(word => word !== 'RPC')
        .join(' ');
    }

    if (checkedID === ('horizen_testnet_evm' as ChainID)) {
      result[checkedID] = result[ChainID.HORIZEN_TESTNET];
    }

    return result;
  }, {});
};