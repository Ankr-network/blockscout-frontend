import { tHTML } from '@ankr.com/common';

import { projectsIntlRoot } from 'domains/projects/const';

export const renderAmount = (amount = '0') => {
  return tHTML(`${projectsIntlRoot}.final-price`, {
    usdValue: amount,
  });
};
