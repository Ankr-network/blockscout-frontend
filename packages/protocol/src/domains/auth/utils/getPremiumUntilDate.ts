export interface PremiumUntilDateParams {
  expiresAt?: number;
  isOldPremium: boolean;
}

// needs to turn premium subscription date into milliseconds from kiloseconds
const MILLISECONDS_COEFFICIENT = 1_000_000;

export const getPremiumUntilDate = ({
  expiresAt,
  isOldPremium,
}: PremiumUntilDateParams) =>
  isOldPremium && expiresAt
    ? new Date(expiresAt * MILLISECONDS_COEFFICIENT)
    : undefined;
