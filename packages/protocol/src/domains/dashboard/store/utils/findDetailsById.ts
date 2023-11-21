import { ChainID } from 'modules/chains/types';

export const findDetailsById = (id: string, chainID?: ChainID) => {
  return id === chainID || id.replaceAll('-', '_') === chainID;
};
