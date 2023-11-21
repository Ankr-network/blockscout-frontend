import { UserEndpointTokenMode, WhitelistItem } from 'multirpc-sdk';

import {
  MAX_AMOUNT_OF_DOMAINS,
  MAX_AMOUNT_OF_IPS,
  MAX_AMOUNT_OF_SMART_CONTRACT_ADDRESSES,
} from '../const';

type SplittedByTypeWhitelist = Record<UserEndpointTokenMode, string[]>;

export interface CanAddItemsToWhitelistParams {
  hasEvmChain?: boolean;
  whitelist: WhitelistItem[];
}

const { ADDRESS, ALL, IP, REFERER } = UserEndpointTokenMode;

export const canAddItemsToWhitelist = ({
  hasEvmChain = false,
  whitelist,
}: CanAddItemsToWhitelistParams) => {
  const splitted = whitelist.reduce<SplittedByTypeWhitelist>(
    (result, { list = [], type }) => {
      if (result[type]) {
        result[type] = [...new Set([...result[type], ...list])];
      } else {
        result[type] = [...new Set(list)];
      }

      return result;
    },
    { [ADDRESS]: [], [ALL]: [], [IP]: [], [REFERER]: [] },
  );

  const isAddingDomainAllowed =
    splitted[REFERER].length < MAX_AMOUNT_OF_DOMAINS;

  const isAddingIPAllowed = splitted[IP].length < MAX_AMOUNT_OF_IPS;

  const isAddingSmartContractAllowed =
    splitted[ADDRESS].length < MAX_AMOUNT_OF_SMART_CONTRACT_ADDRESSES &&
    hasEvmChain;

  const premissionsMap: Record<UserEndpointTokenMode, boolean> = {
    [ADDRESS]: isAddingSmartContractAllowed,
    [ALL]: false,
    [IP]: isAddingIPAllowed,
    [REFERER]: isAddingDomainAllowed,
  };

  return {
    isAddingDomainAllowed,
    isAddingIPAllowed,
    isAddingSmartContractAllowed,
    premissionsMap,
  };
};
