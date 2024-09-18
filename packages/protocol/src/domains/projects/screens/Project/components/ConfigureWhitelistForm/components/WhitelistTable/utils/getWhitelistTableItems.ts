import { UserEndpointTokenMode, WhitelistItem } from 'multirpc-sdk';
import { ChainID } from '@ankr.com/chains-list';

import { WhitelistTableItem } from '../types';
import { filterWhitelistByType } from './filterWhitelistByType';

export interface GetWhitelistTableItemsParams {
  whitelist?: WhitelistItem[];
  whitelistType: UserEndpointTokenMode;
}

type AddressToChainsMap = Record<string, ChainID[]>;

export const getWhitelistTableItems = ({
  whitelist = [],
  whitelistType,
}: GetWhitelistTableItemsParams) => {
  const addressToChainsMap = filterWhitelistByType(
    whitelistType,
    whitelist,
  ).reduce<AddressToChainsMap>((result, { blockchain, list }) => {
    list.forEach(address => {
      if (result[address]) {
        result[address].push(blockchain as ChainID);
      } else {
        result[address] = [blockchain as ChainID];
      }
    });

    return result;
  }, {});

  return Object.entries(addressToChainsMap).map<WhitelistTableItem>(
    ([address, chains]) => ({ address, chains }),
  );
};
