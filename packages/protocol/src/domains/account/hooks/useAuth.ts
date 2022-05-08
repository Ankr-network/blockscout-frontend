import { Tier } from 'multirpc-sdk';
import { useAuth as useCommonAuth } from 'modules/auth/hooks/useAuth';

export interface Auth {
  account?: string;
  isConnected: boolean;
  isConnecting: boolean;
  premiumUntil?: Date;
}

// needs to turn premium subscription date into milliseconds from kiloseconds
const MILLISECONDS_COEFFICIENT = 1_000_000;

export const useAuth = (): Auth => {
  const { address, credentials, loading: isConnecting } = useCommonAuth();

  const isPremium = credentials?.tier === Tier.Premium;

  const isConnected = !!address;
  const premiumUntil =
    isPremium && credentials?.expires_at
      ? new Date(credentials.expires_at * MILLISECONDS_COEFFICIENT)
      : undefined;
  const account = credentials?.endpoint_token;

  return { account, isConnected, isConnecting, premiumUntil };
};
