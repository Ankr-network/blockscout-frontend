import { AvailableReadProviders } from 'provider';

export interface IDashboardSDKCotractData {
  abi: unknown;
  address: string;
  providerName: AvailableReadProviders;
}
