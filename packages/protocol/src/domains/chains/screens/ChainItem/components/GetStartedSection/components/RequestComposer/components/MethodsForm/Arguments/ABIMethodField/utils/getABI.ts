import { ABI } from 'domains/requestComposer/types';
import { FetchABIError } from '../types';
import { fetchABI } from './fetchABI';
import { isABI } from 'domains/requestComposer/utils/validators/isABI';
import { isURL } from 'domains/requestComposer/utils/validators/isURL';
import { parseABI } from './parseABI';

export const getABI = async (input: string): Promise<ABI | undefined> => {
  if (isABI(input)) {
    return parseABI(input);
  }

  if (isURL(input)) {
    const abi = await fetchABI(input);

    return abi;
  }

  throw new Error(FetchABIError.INVALID_JSON_OR_URL);
};
