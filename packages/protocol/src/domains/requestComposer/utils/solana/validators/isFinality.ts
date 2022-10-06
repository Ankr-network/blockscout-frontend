import { Finality } from '@solana/web3.js';

const finalities = ['confirmed', 'finalized'];

export const isFinality = (value: string): value is Finality =>
  finalities.includes(value);
