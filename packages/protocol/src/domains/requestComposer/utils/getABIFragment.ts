import { ABI, ABIItem } from '../types';

export const getABIFragment = (json: string, method: string): ABIItem => {
  const parsedABI = JSON.parse(json) as unknown as ABI;

  return parsedABI.find(({ name }) => name === method) ?? parsedABI[0];
};
