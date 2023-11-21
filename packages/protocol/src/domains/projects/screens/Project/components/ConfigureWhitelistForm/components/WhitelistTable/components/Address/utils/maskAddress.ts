import { maskText } from 'modules/common/utils/maskText';

import { MAX_CONTENT_LENGTH } from '../constants';

export const maskAddress = (address: string) => {
  const shouldMask = address.length > MAX_CONTENT_LENGTH;

  return {
    address: shouldMask ? maskText({ text: address }) : address,
    isMasked: shouldMask,
  };
};
