import { EthAddressType, OauthLoginProvider } from 'multirpc-sdk';
import { useMemo } from 'react';

import { useFetchAssociatedAccountsQuery } from 'domains/oauth/actions/fetchAssociatedAccounts';
import { useFetchEthAddressesQuery } from 'domains/oauth/actions/fetchEthAddresses';

export const useLoginMethodsBlock = () => {
  const { data } = useFetchAssociatedAccountsQuery();
  const { data: ethAddresses } = useFetchEthAddressesQuery();

  const web3Provider = useMemo(() => {
    const foundProvider = data?.find(provider => Boolean(provider.address));

    return foundProvider;
  }, [data]);

  const isEthAddressTypeUser = useMemo(() => {
    return Boolean(ethAddresses?.addresses.find(address => address.type === EthAddressType.User))
  }, [ethAddresses]);
  //  prevent WEB3 user from adding providers in case of Oauth
  const shouldPreventAddProviderForWeb3Users = isEthAddressTypeUser && !web3Provider;

  const walletAddress = useMemo(() => web3Provider?.address, [web3Provider]);

  const googleProvider = useMemo(() => {
    const foundProvider = data?.find(
      provider => provider.provider === OauthLoginProvider.Google,
    );

    return foundProvider;
  }, [data]);

  const githubProvider = useMemo(() => {
    const foundProvider = data?.find(
      provider => provider.provider === OauthLoginProvider.Github,
    );

    return foundProvider;
  }, [data]);

  const shouldHideDisconnectButton =
    Boolean(web3Provider) ||
    shouldPreventAddProviderForWeb3Users ||
    [web3Provider, googleProvider, githubProvider].filter(Boolean).length <= 1;

  return {
    googleProvider,
    githubProvider,
    walletAddress,
    shouldHideDisconnectButton,
    shouldDisableConnectButton: shouldPreventAddProviderForWeb3Users,
  };
};
