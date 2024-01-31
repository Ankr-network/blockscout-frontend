import { useAppSelector } from 'store/useAppSelector';
import { useConnectWalletDialog } from 'modules/layout/components/ConnectWalletDialog/hooks/useConnectWalletDialog';

import { selectCanContinueTeamCreationFlow } from '../store/selectors';

export const useContinueTeamCreationFlow = () => {
  const { isWeb3UserWithEmailBound } = useConnectWalletDialog();

  const isTeamCreationFlowAvailable = useAppSelector(
    selectCanContinueTeamCreationFlow,
  );

  const canContinueTeamCreationFlow =
    isTeamCreationFlowAvailable && !isWeb3UserWithEmailBound;

  return {
    canContinueTeamCreationFlow,
  };
};
