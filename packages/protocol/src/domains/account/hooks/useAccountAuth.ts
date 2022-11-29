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
  } = useAuth();

  const tier = workerTokenData?.tier;

  const isConnected = isWalletConnected && !isConnecting;
  const isPremium = tier === Tier.Premium;
  const isNew = !credentials;

  const premiumUntil =
    isPremium && credentials?.expires_at
      ? new Date(credentials.expires_at * MILLISECONDS_COEFFICIENT)
      : undefined;

  return {
    isConnected,
    isConnecting,
    isNew,
    premiumUntil,
    tier,
    credentials,
    workerTokenData,
    hasOauthLogin,
    isLoggedIn,
  };
};
