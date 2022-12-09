import { sleep } from '@ankr.com/common';
import { IProvidersMap } from '@ankr.com/provider';
import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';
import { configFromEnv } from './config';
import { PolkadotProvider } from './polkadot';
import { POLKADOT_PROVIDER_ID } from './types';

const POLKADOT_CONNECT_WAIT_MS = 250;

interface IPolkadotProvidersMap extends IProvidersMap {
  [POLKADOT_PROVIDER_ID]: PolkadotProvider;
}

export const initProviderManagerPolkadot = async (): Promise<void> => {
  const providerManager =
    ProviderManagerSingleton.getInstance<IPolkadotProvidersMap>();

  const provider = providerManager.getWriteProviderById(POLKADOT_PROVIDER_ID);

  if (provider) {
    if (!provider.isConnected()) {
      await provider.connect();
      return;
    }
  }

  const { networkType, polkadotUrl } = configFromEnv();

  const newProvider = new PolkadotProvider({
    networkType,
    polkadotUrl,
  });
  providerManager.addProvider(POLKADOT_PROVIDER_ID, newProvider);

  await sleep(POLKADOT_CONNECT_WAIT_MS);

  await newProvider.connect();
};
