import { IJwtToken, Tier, WorkerTokenData } from 'multirpc-sdk';
import { useAuth } from 'domains/auth/hooks/useAuth';

export interface Auth {
  isConnected: boolean;
  isConnecting: boolean;
  isNew: boolean;
  premiumUntil?: Date;
  tier?: Tier;
  credentials?: IJwtToken;
  workerTokenData?: WorkerTokenData;
  hasOauthLogin?: boolean;
  isLoggedIn: boolean;
  isUserEthAddressType: boolean;
  hasPrivateAccess: boolean;
  hasPremium: boolean;
  hasWeb3Connection: boolean;
  isOldPremium: boolean;
}

// needs to turn premium subscription date into milliseconds from kiloseconds
const MILLISECONDS_COEFFICIENT = 1_000_000;

export const useAccountAuth = (): Auth => {
  const {
    isWalletConnected,
    credentials,
    workerTokenData,
    loading: isConnecting,
    hasOauthLogin,
    isLoggedIn,
    isUserEthAddressType,
    hasPrivateAccess,
    hasPremium,
    hasWeb3Connection,
    isTokenExpired,
  } = useAuth();

  const tier = workerTokenData?.tier;

  const isConnected = isWalletConnected && !isConnecting;
  const isOldPremium = Boolean(tier === Tier.Premium || isTokenExpired);

  const premiumUntil =
    isOldPremium && credentials?.expires_at
      ? new Date(credentials.expires_at * MILLISECONDS_COEFFICIENT)
      : undefined;

  return {
    isConnected,
    isConnecting,
    isNew: !hasPrivateAccess,
    premiumUntil,
    tier,
    hasPrivateAccess,
    workerTokenData,
    hasOauthLogin,
    isLoggedIn,
    isUserEthAddressType,
    hasPremium,
    hasWeb3Connection: Boolean(hasWeb3Connection),
    isOldPremium,
  };
};
