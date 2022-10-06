import { LargestAccountsFilter } from '@solana/web3.js';

const filters: LargestAccountsFilter[] = ['circulating', 'nonCirculating'];

export const isLargestAccountsFilter = (value: string) =>
  filters.includes(value as LargestAccountsFilter);
