import { FetchRequestResult } from 'domains/requestComposer/types';
import { TronChainMethodResponse } from 'domains/requestComposer/types/tron';

export type FetchTronChainRequestResult =
  FetchRequestResult<TronChainMethodResponse>;
