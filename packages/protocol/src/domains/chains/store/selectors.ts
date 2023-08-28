import { createSelector } from '@reduxjs/toolkit';

import { chainsFetchBlockchains } from '../actions/public/fetchBlockchains';

export const selectBlockchains = createSelector(
  chainsFetchBlockchains.select(),
  blockchains => blockchains,
);
