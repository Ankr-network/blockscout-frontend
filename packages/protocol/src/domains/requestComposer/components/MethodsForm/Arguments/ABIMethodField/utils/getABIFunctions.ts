import {
  ABI,
  ABIItemType,
  StateMutability,
} from 'domains/requestComposer/types';

export const getABIFunctions = (abi: ABI): ABI =>
  abi.filter(
    ({ stateMutability, type }) =>
      type === ABIItemType.FUNCTION && stateMutability === StateMutability.VIEW,
  );
