import { EthAddressType, OauthLoginProvider } from 'multirpc-sdk';
import { useMemo } from 'react';

import { useFetchAssociatedAccountsQuery } from 'domains/oauth/actions/fetchAssociatedAccounts';
import { useFetchEthAddressesQuery } from 'domains/oauth/actions/fetchEthAddresses';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useLoginMethodsBlock = () => {
  const { oauthProviders: [oauthProvider] = [undefined] } = useAuth();

  const { data } = useFetchAssociatedAccountsQuery();
  const { data: ethAddresses } = useFetchEthAddressesQuery();

  const web3Provider = useMemo(() => {
    const foundProvider = data?.find(provider => Boolean(provider.address));

    return foundProvider;
  }, [data]);

  const isEthAddressTypeUser = useMemo(() => {
    return Boolean(
      ethAddresses?.addresses.find(
        address => address.type === EthAddressType.User,
      ),
    );
  }, [ethAddresses]);
  //  prevent WEB3 user from adding providers in case of Oauth
  const shouldPreventAddProviderForWeb3Users =
    isEthAddressTypeUser && !web3Provider;

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

  const shouldHideGoogleDisconnectButton =
    shouldHideDisconnectButton || oauthProvider === OauthLoginProvider.Google;
  const shouldHideGithubDisconnectButton =
    shouldHideDisconnectButton || oauthProvider === OauthLoginProvider.Github;

  return {
    googleProvider,
    githubProvider,
    walletAddress,
    shouldHideGoogleDisconnectButton,
    shouldHideGithubDisconnectButton,
    shouldDisableConnectButton: shouldPreventAddProviderForWeb3Users,
  };
};
