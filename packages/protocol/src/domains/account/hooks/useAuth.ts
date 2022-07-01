import { Tier } from 'multirpc-sdk';
import { useAuth as useCommonAuth } from 'domains/auth/hooks/useAuth';

export interface Auth {
  isConnected: boolean;
  isConnecting: boolean;
  isNew: boolean;
  premiumUntil?: Date;
  tier?: Tier;
}

// needs to turn premium subscription date into milliseconds from kiloseconds
const MILLISECONDS_COEFFICIENT = 1_000_000;

export const useAuth = (): Auth => {
  const { address, credentials, loading: isConnecting } = useCommonAuth();

  const tier = credentials?.tier;

  const isConnected = !!address;
  const isPremium = tier === Tier.Premium;
  const isNew = !credentials;

  const premiumUntil =
    isPremium && credentials?.expires_at
      ? new Date(credentials.expires_at * MILLISECONDS_COEFFICIENT)
      : undefined;

  return { isConnected, isConnecting, isNew, premiumUntil, tier };
};
