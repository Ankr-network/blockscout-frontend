import { ChainID, Timeframe } from 'domains/chains/types';
import { t } from '@ankr.com/common';
import { PrivateStatsInterval } from 'multirpc-sdk';

export const POLL_INTERVAL = 60_000;

const { Hour, Day, Week, Month } = Timeframe;

const root = 'chains.timeframes';
export const timeframeToLabelMap: Record<Timeframe, string> = {
  [Hour]: t(`${root}.hour`),
  [Day]: t(`${root}.day`),
  [Week]: t(`${root}.week`),
  [Month]: t(`${root}.month`),
};

type Map = Record<Timeframe, PrivateStatsInterval>;
export const timeframeToIntervalMap: Map = {
  [Hour]: PrivateStatsInterval.HOUR,
  [Day]: PrivateStatsInterval.DAY,
  [Week]: PrivateStatsInterval.WEEK,
  [Month]: PrivateStatsInterval.MONTH,
};

type ChainIDLinkMap = Partial<Record<ChainID, ChainID>>;
const PUBLIC_CHAIN_ID_LINK_MAP: ChainIDLinkMap = {
  'scrt-rest': ChainID.SECRET,
  'scrt-rpc': ChainID.SECRET,
  scrt_cosmos: ChainID.SECRET,
  'scrt-cosmos-grpc-web': ChainID.SECRET,
  'scrt-cosmos-rest': ChainID.SECRET,
  [ChainID.ZETACHAIN_COSMOS_REST_TESTNET]: ChainID.ZETACHAIN_TESTNET,
  [ChainID.ZETACHAIN_EVM_TESTNET]: ChainID.ZETACHAIN_TESTNET,
  [ChainID.ZETACHAIN_TENDERMINT_REST_TESTNET]: ChainID.ZETACHAIN_TESTNET,
  [ChainID.ZETACHAIN_TENDERMINT_RPC_TESTNET]: ChainID.ZETACHAIN_TESTNET,
  [ChainID.ZETACHAIN_TESTNET]: ChainID.ZETACHAIN_TESTNET,
  [ChainID.ZETACHAIN_COSMOS_REST_ATHENS_TESTNET]:
    ChainID.ZETACHAIN_ATHENS_TESTNET,
  [ChainID.ZETACHAIN_EVM_ATHENS_TESTNET]: ChainID.ZETACHAIN_ATHENS_TESTNET,
  [ChainID.ZETACHAIN_TENDERMINT_REST_ATHENS_TESTNET]:
    ChainID.ZETACHAIN_ATHENS_TESTNET,
  [ChainID.ZETACHAIN_TENDERMINT_RPC_ATHENS_TESTNET]:
    ChainID.ZETACHAIN_ATHENS_TESTNET,
  [ChainID.ZETACHAIN_ATHENS_TESTNET]: ChainID.ZETACHAIN_ATHENS_TESTNET,
  [ChainID.HORIZEN_TESTNET_EVM]: ChainID.HORIZEN_TESTNET,
};

export const checkPublicChainsAndGetChainId = (chainId: ChainID) =>
  PUBLIC_CHAIN_ID_LINK_MAP[chainId] || chainId;

const PRIVATE_CHAIN_ID_LINK_MAP: ChainIDLinkMap = {
  'scrt-rest': ChainID.SECRET,
  'scrt-rpc': ChainID.SECRET,
  'scrt-cosmos-grpc-web': ChainID.SECRET_COSMOS,
  'scrt-cosmos-rest': ChainID.SECRET_COSMOS,
  // chain ids for private stats differ from regular chain ids
  [ChainID.ZETACHAIN_COSMOS_REST_TESTNET]: 'zetachain_testnet' as ChainID,
  [ChainID.ZETACHAIN_EVM_TESTNET]: 'zetachain_evm_testnet' as ChainID,
  [ChainID.ZETACHAIN_TENDERMINT_REST_TESTNET]:
    'zetachain_tendermint_testnet' as ChainID,
  [ChainID.ZETACHAIN_TENDERMINT_RPC_TESTNET]:
    'zetachain_tendermint_testnet' as ChainID,
  [ChainID.ZETACHAIN_TESTNET]: 'zetachain_testnet' as ChainID,

  [ChainID.ZETACHAIN_COSMOS_REST_ATHENS_TESTNET]:
    'zetachain_athens_testnet' as ChainID,
  [ChainID.ZETACHAIN_EVM_ATHENS_TESTNET]:
    'zetachain_evm_athens_testnet' as ChainID,
  [ChainID.ZETACHAIN_TENDERMINT_REST_ATHENS_TESTNET]:
    'zetachain_tendermint_athens_testnet' as ChainID,
  [ChainID.ZETACHAIN_TENDERMINT_RPC_ATHENS_TESTNET]:
    'zetachain_tendermint_athens_testnet' as ChainID,
  [ChainID.ZETACHAIN_ATHENS_TESTNET]: 'zetachain_athens_testnet' as ChainID,

  [ChainID.TENET_EVM]: 'tenet_evm' as ChainID,
  [ChainID.HORIZEN_TESTNET_EVM]: 'horizen_testnet_evm' as ChainID,
};

export const checkPrivateChainsAndGetChainId = (chainId: ChainID) =>
  PRIVATE_CHAIN_ID_LINK_MAP[chainId] || chainId;
