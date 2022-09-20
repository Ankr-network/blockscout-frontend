import { ABI } from 'domains/requestComposer/types';

export const parseABI = (json: string) => JSON.parse(json) as unknown as ABI;
