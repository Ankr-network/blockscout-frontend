import { AvailableReadProviders } from '@ankr.com/provider';

export interface IDashboardSDKCotractData {
  abi: unknown;
  address: string;
  providerName: AvailableReadProviders;
}
