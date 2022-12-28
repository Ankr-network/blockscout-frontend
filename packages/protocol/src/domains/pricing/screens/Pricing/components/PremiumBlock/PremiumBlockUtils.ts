interface ShouldShowConnectWalletButtoParams {
  hasWeb3Connection?: boolean;
  hasOauthLogin?: boolean;
  hasPrivateAccess?: boolean;
  isUserAddress?: boolean;
}

export const shouldShowConnectWalletButton = ({
  hasWeb3Connection,
  hasOauthLogin,
  hasPrivateAccess,
  isUserAddress,
}: ShouldShowConnectWalletButtoParams) => {
  if (!hasWeb3Connection && !hasOauthLogin) {
    return { hasConnectButton: true, isNewWeb3UserWithBindedEmail: false };
  }

  if (hasWeb3Connection) {
    return { hasConnectButton: false, isNewWeb3UserWithBindedEmail: false };
  }

  const isNewWeb3UserWithBindedEmail =
    hasOauthLogin && !hasPrivateAccess && isUserAddress;

  if (isNewWeb3UserWithBindedEmail) {
    return { hasConnectButton: true, isNewWeb3UserWithBindedEmail: true };
  }

  return { hasConnectButton: false, isNewWeb3UserWithBindedEmail: false };
};
