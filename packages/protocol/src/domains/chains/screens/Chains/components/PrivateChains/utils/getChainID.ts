import { Chain } from 'domains/chains/types';

export const getChainID = ({
  id,
  chainWithoutMainnet: { id: chainWithoutMainnetId } = {},
}: Chain) => chainWithoutMainnetId ?? id;
