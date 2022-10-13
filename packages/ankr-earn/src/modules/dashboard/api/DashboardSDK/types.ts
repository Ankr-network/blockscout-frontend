import { AvailableReadProviders } from 'common';

export interface IDashboardSDKCotractData {
  abi: unknown;
  address: string;
  providerName: AvailableReadProviders;
}
