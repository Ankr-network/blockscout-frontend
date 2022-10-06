import { Commitment } from '@solana/web3.js';

const commitments: Commitment[] = [
  'processed',
  'confirmed',
  'finalized',
  'recent',
  'single',
  'singleGossip',
  'root',
  'max',
];

export const isCommitment = (value: string): value is Commitment =>
  commitments.includes(value as Commitment);
