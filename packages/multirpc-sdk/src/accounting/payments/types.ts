import { EBlockchain, Token, Web3Address } from "../../common";

export enum ECommitmentLevel {
  PENDING = 'PENDING',
  LATEST = 'LATEST',
  SAFE = 'SAFE',
  FINALIZED = 'FINALIZED',
  UNKNOWN = 'UNKNOWN',
}

interface IGetCryptoPaymentOptionToken {
  token_address: Web3Address;
  token_symbol: Token;
  min_amount: string;
  max_amount: string;
  usd_exchange_rate: string;
  usd_exchange_rate_decimals: string;
  active: boolean;
  token_decimals: number;
}

export interface IGetCryptoPaymentOption {
  blockchain: EBlockchain;
  commitment_level?: ECommitmentLevel;
  confirmation_blocks: number;
  deposit_contract_address: Web3Address;
  tokens: IGetCryptoPaymentOptionToken[];
}

export interface IGetCryptoPaymentOptionsResult {
  options: IGetCryptoPaymentOption[];
}

export interface IGetCryptoPaymentOptionsResponse {
  result: IGetCryptoPaymentOptionsResult;
}

export interface IGetCryptoPaymentOptionsParams {
  active?: boolean;
}
