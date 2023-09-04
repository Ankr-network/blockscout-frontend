import { Address } from '@ankr.com/provider';

export interface NegativeBalanceTermsOfServicesStatusParams {
  group: Address;
}

export interface NegativeBalanceTermsOfServicesStatusResponse {
  tosAccepted: boolean;
}
