import { CONFIRMATION_BLOCKS } from 'multirpc-sdk';

const CREATE_ACCOUNT_BLOCKS_COUNT = CONFIRMATION_BLOCKS;

const INITIAL_VALUE = 4;

const getRemainingValue = (remainingBlocks: number) => {
  return (
    ((CREATE_ACCOUNT_BLOCKS_COUNT - remainingBlocks) /
      CREATE_ACCOUNT_BLOCKS_COUNT) *
    100
  );
};

export const getProgressValue = (remainingBlocks: number): number => {
  return remainingBlocks === CREATE_ACCOUNT_BLOCKS_COUNT
    ? INITIAL_VALUE
    : getRemainingValue(remainingBlocks);
};
