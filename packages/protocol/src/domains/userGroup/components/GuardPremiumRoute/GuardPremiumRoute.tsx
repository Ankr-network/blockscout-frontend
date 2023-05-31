import { useEffect, ReactNode } from 'react';
import { useHistory } from 'react-router';

import { INDEX_PATH } from 'domains/chains/routes';
import { fetchPremiumStatus } from 'domains/auth/actions/fetchPremiumStatus';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSelectedUserGroup } from '../../hooks/useSelectedUserGroup';

interface GuardPremiumRouteProps {
  children: ReactNode;
  hasPremium: boolean;
  isDisabled?: boolean;
}

export const GuardPremiumRoute = ({
  children,
  hasPremium,
  isDisabled,
}: GuardPremiumRouteProps) => {
  const history = useHistory();

  const { selectedGroupAddress } = useSelectedUserGroup();
  const [, { isLoading, isUninitialized }] =
    useQueryEndpoint(fetchPremiumStatus);

  useEffect(() => {
    if (!hasPremium && !isLoading && !isUninitialized) {
      history.replace(INDEX_PATH);
    }
  }, [history, hasPremium, isLoading, isUninitialized]);

  if (isDisabled && selectedGroupAddress) {
    return null;
  }

  return hasPremium ? <>{children}</> : null;
};
