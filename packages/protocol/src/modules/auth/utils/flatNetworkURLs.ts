interface FlattenURLs<URL> {
  mainnetURLs: URL[];
  mainnetURLsCount: number;
  testnetURLs: URL[];
}

interface NetworkURL {
  rpc: string;
  ws?: string;
}

interface Network<URL extends NetworkURL> {
  extenders?: Network<URL>[];
  extensions?: Network<URL>[];
  testnets?: Network<URL>[];
  urls: URL[];
}

export function flatNetworkURLs<URL extends NetworkURL, N extends Network<URL>>(
  network: N,
): FlattenURLs<URL> {
  const mainnetURLs = [
    ...network.urls,
    ...(network.extensions || []).flatMap<URL>(({ urls }) => urls),
    ...(network.extenders || []).flatMap<URL>(({ urls }) => urls),
  ];

  const mainnetURLsCount = mainnetURLs.flatMap<string>(({ rpc, ws }) =>
    ws ? [rpc, ws] : [rpc],
  ).length;

  const testnetURLs = (network.testnets || []).flatMap<URL>(
    ({ extensions, urls }) => [
      ...urls,
      ...(extensions || []).flatMap<URL>(extension => extension.urls),
    ],
  );

  return { mainnetURLs, mainnetURLsCount, testnetURLs };
}
