import { useAuth as useCommonAuth } from 'modules/auth/hooks/useAuth';

export interface Auth {
  isConnected: boolean;
  isConnecting: boolean;
  premiumUntil?: Date;
}

// needs to turn premium subscription date into milliseconds from kiloseconds
const MILLISECONDS_COEFFICIENT = 1_000_000;

export const useAuth = (): Auth => {
  const { address, credentials, loading: isConnecting } = useCommonAuth();

  const isConnected = !!address;
  const premiumUntil = credentials?.expires_at
    ? new Date(credentials.expires_at * MILLISECONDS_COEFFICIENT)
    : undefined;

  return { isConnected, isConnecting, premiumUntil };
};
