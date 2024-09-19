import { ChainID } from '@ankr.com/chains-list';

export const findDetailsById = (id: string, chainID?: ChainID) => {
  return id === chainID || id.replaceAll('-', '_') === chainID;
};
