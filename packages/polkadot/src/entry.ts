import { IProvidersMap, sleep } from '@ankr.com/provider';
import { PolkadotProvider } from './polkadot';
import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';
import { configFromEnv } from './config';

const POLKADOT_CONNECT_WAIT_MS = 250;

interface ProvidersWithPolkadot extends IProvidersMap {
  polkadot: PolkadotProvider;
}

export async function addPolkadot(): Promise<void> {
  const providerManager =
    ProviderManagerSingleton.getInstance<ProvidersWithPolkadot>();

  const provider = providerManager.getWriteProviderById('polkadot');

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

  providerManager.addProvider('polkadot', newProvider);

  await sleep(POLKADOT_CONNECT_WAIT_MS);

  await newProvider.connect();
}
