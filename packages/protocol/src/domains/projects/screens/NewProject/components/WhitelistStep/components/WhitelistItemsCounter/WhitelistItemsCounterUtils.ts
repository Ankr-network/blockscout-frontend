import { t } from '@ankr.com/common';

import {
  MAX_AMOUNT_OF_DOMAINS,
  MAX_AMOUNT_OF_IPS,
  MAX_AMOUNT_OF_SMART_CONTRACT_ADDRESSES,
} from 'domains/projects/const';
import { WhiteListItem } from 'domains/projects/types';

export const intlKey = 'projects.new-project.step-3.whitelist-items-counter';

export const getCounterLabel = (type: WhiteListItem) => {
  switch (type) {
    case WhiteListItem.address:
      return t(`${intlKey}.smart-contracts`);
    default:
    case WhiteListItem.referer:
      return t(`${intlKey}.domains`);
    case WhiteListItem.ip:
      return t(`${intlKey}.ips`);
  }
};

export const getWhitelistLimit = (type: WhiteListItem) => {
  switch (type) {
    case WhiteListItem.address:
      return MAX_AMOUNT_OF_SMART_CONTRACT_ADDRESSES;
    default:
    case WhiteListItem.referer:
      return MAX_AMOUNT_OF_DOMAINS;
    case WhiteListItem.ip:
      return MAX_AMOUNT_OF_IPS;
  }
};
