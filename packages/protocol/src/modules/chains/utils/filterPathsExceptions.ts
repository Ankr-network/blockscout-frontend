import { ChainID, ChainPath } from '@ankr.com/chains-list';

const PATHS_EXCEPTIONS = [
  ChainID.HORIZEN,
  ChainID.HORIZEN_TESTNET,
  ChainID.TENET,
];

export const filterPathsExceptions = (chainPath: ChainPath) =>
  !PATHS_EXCEPTIONS.includes(chainPath as ChainID);
