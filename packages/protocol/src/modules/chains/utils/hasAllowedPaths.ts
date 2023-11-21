import { Chain, ChainPath } from '../types';
import { clearPathPrefix } from './clearPathPrefix';

export const hasAllowedPaths = (chain: Chain, paths: ChainPath[]) =>
  chain.paths?.some(chainPath =>
    paths.some(path => path === clearPathPrefix(chainPath)),
  ) ?? false;
