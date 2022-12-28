import { TronChainMethodResponse } from 'domains/requestComposer/types/tron';

export interface FetchTronChainRequestResult {
  error?: unknown;
  response?: [TronChainMethodResponse];
  time: number;
}
