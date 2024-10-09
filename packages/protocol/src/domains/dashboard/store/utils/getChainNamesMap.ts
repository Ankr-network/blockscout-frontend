import { Chain, ChainID } from '@ankr.com/chains-list';

import { checkPrivateChainsAndGetChainId } from 'domains/chains/screens/ChainPage/components/UsageDataSection/const';
import {
  ALLORA_TESTNET_TENDERMINT_NAME,
  KAVA_TENDERMINT_NAME,
  SECRET_TENDERMINT_NAME,
  SEI_TENDERMINT_NAME,
  SEI_TESTNET_TENDERMINT_NAME,
  TON_NAME,
} from 'modules/chains/constants';

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
      result[checkedID] = SEI_TESTNET_TENDERMINT_NAME;
    }

    if (checkedID === ('zetachain_tendermint_testnet' as ChainID)) {
      result[checkedID] = name
        .split(' ')
        .filter(word => word !== 'RPC')
        .join(' ');
    }

    if (checkedID === ChainID.SEI) {
      result[checkedID] = SEI_TENDERMINT_NAME;
    }

    if (checkedID === ('ton_api_v2' as ChainID)) {
      result[checkedID] = TON_NAME;
    }

    if (checkedID === ('kava_rpc' as ChainID)) {
      result[checkedID] = KAVA_TENDERMINT_NAME;
    }

    if (checkedID === ChainID.SECRET) {
      result[checkedID] = SECRET_TENDERMINT_NAME;
    }

    if (checkedID === ChainID.ALLORA_TESTNET) {
      result[checkedID] = ALLORA_TESTNET_TENDERMINT_NAME;
    }

    return result;
  }, {});
};
