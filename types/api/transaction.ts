import type { AddressParam } from './addressParams';
import type { BlockTransactionsResponse } from './block';
import type { DecodedInput } from './decodedInput';
import type { Fee } from './fee';
import type { TokenTransfer } from './tokenTransfer';

export type TransactionRevertReason = {
  raw: string;
} | DecodedInput;

export type Transaction = (
  {
    to: AddressParam;
    created_contract: null;
  } |
  {
    to: null;
    created_contract: AddressParam;
  }
) & {
  hash: string;
  result: string;
  confirmations: number;
  status: 'ok' | 'error' | null;
  block: number | null;
  timestamp: string | null;
  confirmation_duration: Array<number>;
  from: AddressParam;
  value: string;
  fee: Fee;
  gas_price: string;
  type: number | null;
  gas_used: string | null;
  gas_limit: string;
  max_fee_per_gas: string | null;
  max_priority_fee_per_gas: string | null;
  priority_fee: string | null;
  base_fee_per_gas: string | null;
  tx_burnt_fee: string | null;
  nonce: number;
  position: number | null;
  revert_reason: TransactionRevertReason | null;
  raw_input: string;
  decoded_input: DecodedInput | null;
  token_transfers: Array<TokenTransfer> | null;
  token_transfers_overflow: boolean;
  exchange_rate: string;
  method: string | null;
  tx_types: Array<TransactionType>;
  tx_tag: string | null;
}

export type TransactionsResponse = TransactionsResponseValidated | TransactionsResponsePending;

export interface TransactionsResponseValidated {
  items: Array<Transaction>;
  next_page_params: {
    block_number: number;
    index: number;
    items_count: number;
    filter: 'validated';
  } | null;
}

export interface TransactionsResponsePending {
  items: Array<Transaction>;
  next_page_params: {
    inserted_at: string;
    hash: string;
    filter: 'pending';
  } | null;
}

export type TransactionType = 'token_transfer' | 'contract_creation' | 'contract_call' | 'token_creation' | 'coin_transfer'

export type TxsResponse = TransactionsResponseValidated | TransactionsResponsePending | BlockTransactionsResponse;