import { ReactNode } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { Section } from 'modules/delegate-stake/components/Section';

import { UnsupportedBanner } from '../UnsupportedBanner';

interface ISupportGuardProps {
  children: ReactNode;
}

// todo: remove it in once all problems with other wallets will be solved.
/**
 * Temporary solution for MVP of ankr token staking.
 */
export const SupportGuard = ({ children }: ISupportGuardProps): JSX.Element => {
  const { isMetaMask } = useAuth(AvailableWriteProviders.ethCompatible);

  if (!isMetaMask) {
    return (
      <Section>
        <UnsupportedBanner />
      </Section>
    );
  }

  return <>{children}</>;
};
