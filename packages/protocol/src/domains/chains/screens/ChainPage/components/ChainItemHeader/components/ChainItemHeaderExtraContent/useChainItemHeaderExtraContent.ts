import { Chain } from '@ankr.com/chains-list';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useCodeExampleStatus } from 'domains/chains/screens/ChainPage/components/ChainProjectsSection/useCodeExampleStatus';

export const useChainItemHeaderExtraContent = (
  chain: Chain,
  onOpenCodeExample?: () => void,
) => {
  const { isLoggedIn } = useAuth();

  const { isCodeExampleDisabled } = useCodeExampleStatus(
    chain,
    onOpenCodeExample,
  );

  return {
    isLoggedIn,
    isCodeExampleDisabled,
  };
};
