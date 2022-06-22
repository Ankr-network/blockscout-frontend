import { MultiRpcSdk } from 'multirpc-sdk';

import { API_ENV, getExpectedChainId } from 'modules/common/utils/environment';

export const switchEthereumChain = async (service: MultiRpcSdk) => {
  const { givenProvider } = service.getKeyProvider().getWeb3();

  await givenProvider.request({
    method: 'wallet_switchEthereumChain',
    params: [
      {
        chainId: `0x${getExpectedChainId(API_ENV)}`,
      },
    ],
  });
};
