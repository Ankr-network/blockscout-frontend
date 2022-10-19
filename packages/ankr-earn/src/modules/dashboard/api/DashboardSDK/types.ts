import { AvailableReadProviders } from '@ankr.com/provider-core';

export interface IDashboardSDKCotractData {
  abi: unknown;
  address: string;
  providerName: AvailableReadProviders;
}
