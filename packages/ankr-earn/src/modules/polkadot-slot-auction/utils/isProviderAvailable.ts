export enum ProviderName {
  clover = 'clover',
  polkadot = 'polkadot-js',
}

export function isProviderAvailable(wallet: ProviderName): boolean {
  return !!window.injectedWeb3?.[wallet];
}
