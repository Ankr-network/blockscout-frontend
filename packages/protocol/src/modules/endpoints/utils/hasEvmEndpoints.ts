import { GroupedEndpoints } from 'modules/endpoints/types';
import { evmGroups } from 'modules/endpoints/constants/evmGroups';

export const hasEvmEndpoints = ({ mainnet }: GroupedEndpoints) =>
  mainnet.some(({ id }) => evmGroups.includes(id));
