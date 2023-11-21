import { Chain } from '../types';
import { flatChain } from './flatChain';

export const flatChains = (chains: Chain[]) => chains.flatMap(flatChain);
