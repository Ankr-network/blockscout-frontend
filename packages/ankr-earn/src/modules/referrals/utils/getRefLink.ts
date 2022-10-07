import { ReactText } from 'react';

import { REFERRAL_URL } from './conts';

export const getRefLink = (code: ReactText | null): string => {
  return code ? `${REFERRAL_URL}${code}` : '';
};
