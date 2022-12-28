import { Timeframe } from 'domains/chains/types';
import { ChainID } from 'modules/chains/types';
import { t } from 'modules/i18n/utils/intl';
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
const PUBLIC_SECRET_CHAIN_ID_LINK_MAP: ChainIDLinkMap = {
  'scrt-rest': ChainID.SECRET,
  'scrt-rpc': ChainID.SECRET,
  scrt_cosmos: ChainID.SECRET,
  'scrt-cosmos-grpc-web': ChainID.SECRET,
  'scrt-cosmos-rest': ChainID.SECRET,
};

export const checkPublicSecretChainsAndGetChainId = (chainId: ChainID) =>
  PUBLIC_SECRET_CHAIN_ID_LINK_MAP[chainId] || chainId;

const PRIVATE_SECRET_CHAIN_ID_LINK_MAP: ChainIDLinkMap = {
  'scrt-rest': ChainID.SECRET,
  'scrt-rpc': ChainID.SECRET,
  'scrt-cosmos-grpc-web': ChainID.SECRET_COSMOS,
  'scrt-cosmos-rest': ChainID.SECRET_COSMOS,
};

export const checkPrivateSecretChainsAndGetChainId = (chainId: ChainID) =>
  PRIVATE_SECRET_CHAIN_ID_LINK_MAP[chainId] || chainId;
