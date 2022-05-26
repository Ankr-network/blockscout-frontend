import { IConfig, IJwtToken } from '../common';
import { IBlockchainEntity } from '../worker';
import { FetchBlockchainUrlsResult } from './types';

export const calcJwtTokenHash = async (
  jwtToken: IJwtToken,
): Promise<string> => {
  const secretToken = await crypto.subtle.digest(
    { name: 'SHA-256' },
    new TextEncoder().encode(jwtToken.signed_token),
  );

  const tokenBuffer = Buffer.from(new Uint8Array(secretToken));

  return tokenBuffer.toString('hex');
};

export const formatPublicUrls = (
  blockchainsApiResponse: IBlockchainEntity[],
  publicRpcUrl: string,
) => {
  const avalancheEvmItem = blockchainsApiResponse.find(
    item => item.id === 'avalanche-evm',
  );

  const blockchains = blockchainsApiResponse.filter(
    item => item.id !== 'avalanche-evm',
  );

  return blockchains.reduce<FetchBlockchainUrlsResult>((result, blockchain) => {
    const hasRPC = blockchain.features.includes('rpc');

    if (blockchain.id === 'avalanche') {
      blockchain.paths = avalancheEvmItem?.paths ?? [];
    }

    const rpcURLs: string[] = hasRPC
      ? blockchain?.paths?.map(path =>
          publicRpcUrl.replace('{blockchain}', path),
        ) || []
      : [];
    const wsURLs: string[] = [];

    result[blockchain.id] = { blockchain, rpcURLs, wsURLs };

    return result;
  }, {});
};

export const formatPrivateUrls = (
  blockchains: IBlockchainEntity[],
  config: IConfig,
  tokenHash: string,
) => {
  return blockchains.reduce<FetchBlockchainUrlsResult>((result, blockchain) => {
    const hasRPC = blockchain.features.includes('rpc');
    const hasWS = blockchain.features.includes('ws');

    const rpcURLs: string[] = hasRPC
      ? blockchain?.paths?.map(path =>
          config.privateRpcUrl
            .replace('{blockchain}', path)
            .replace('{user}', tokenHash),
        ) || []
      : [];

    const wsURLs: string[] = hasWS
      ? blockchain?.paths?.map(path =>
          config.privateWsUrl
            .replace('{blockchain}', path)
            .replace('{user}', tokenHash),
        ) || []
      : [];

    result[blockchain.id] = { blockchain, rpcURLs, wsURLs };

    return result;
  }, {});
};

export const catchSignError = async (error: any) => {
  // eslint-disable-next-line no-console
  console.error(error);

  const message = (error.message || error.error).substr(
    0,
    error.message.indexOf('\n'),
  );

  const parts = message.split(':');

  /* try to detect angry MetaMask messages */
  if (parts.length > 0) {
    /* special case for Firefox that doesn't return any errors, only extension stack trace */
    if (
      message.includes('@moz-extension') &&
      message.includes('Returned error: value')
    ) {
      throw new Error('User denied message signature');
    }

    /* cases for other browsers (tested in Chrome, Opera, Brave) */
    if (
      message.includes('MetaMask') ||
      message.includes('Returned error') ||
      message.includes('RPC Error')
    ) {
      throw new Error(parts[parts.length - 1]);
    }
  }

  throw error;
};
