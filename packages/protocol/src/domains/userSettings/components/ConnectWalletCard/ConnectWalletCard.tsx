import { useCallback, useState } from 'react';
import { t } from '@ankr.com/common';

import { ConnectButton } from 'domains/auth/components/ConnectButton';
import { useAppSelector } from 'store/useAppSelector';
import { selectShouldContinueTeamCreationFlow } from 'modules/groups/store/selectors';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';

import { CenterContainer } from '../CenterContainer';
import { InfoCard } from '../InfoCard';

export const ConnectWalletCard = () => {
  const shouldContinueTeamCreationFlow = useAppSelector(
    selectShouldContinueTeamCreationFlow,
  );

  const [isOpenedSignUpDialog, setIsOpenedSignUpDialog] = useState<boolean>(
    Boolean(shouldContinueTeamCreationFlow),
  );

  const handleCloseSignUpDialog = useCallback(() => {
    setIsOpenedSignUpDialog(false);
  }, []);

  return (
    <CenterContainer>
      <InfoCard
        align="center"
        description={t('user-settings.connect-wallet-card.description')}
        title={t('user-settings.connect-wallet-card.title')}
      >
        <ConnectButton
          variant="contained"
          buttonText={t('user-settings.connect-wallet-card.button')}
        />
      </InfoCard>

      {/* SignUp dialog is used for team creation flow in case of user started a new team creation with data transfer */}
      <SignupDialog
        hasOauthLogin={false}
        isOpen={isOpenedSignUpDialog}
        onClose={handleCloseSignUpDialog}
      />
    </CenterContainer>
  );
};
