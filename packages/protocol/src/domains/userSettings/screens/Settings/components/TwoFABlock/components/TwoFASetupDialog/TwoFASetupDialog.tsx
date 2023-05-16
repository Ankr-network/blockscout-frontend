import { t } from '@ankr.com/common';
import { Box, Button } from '@mui/material';
import { useCallback } from 'react';
import { Queries } from 'modules/common/components/Queries/Queries';

import { Dialog } from 'uiKit/Dialog';
import { USER_SETTINGS_INTL_ROOT } from '../../constants';
import { useTwoFASetupDialogStyles } from './TwoFASetupDialogStyles';
import { TwoFAInfo } from './components/TwoFAInfo';
import { ManualTwoFAInfo } from './components/ManualTwoFAInfo';
import { TwoFASetupButtonSwitcher } from './components/TwoFASetupButtonSwitcher';
import {
  useTitle,
  useTwoFASetupData,
  useTwoFASetupVariant,
} from './TwoFASetupDialogUtils';
import { TwoFAControlDialogError } from '../TwoFAControlDialog/components/TwoFAControlDialogError';
import { UserSettingsSetupTwoFAResult } from 'domains/userSettings/actions/twoFA/setupTwoFA';

interface TwoFASetupDialogProps {
  open: boolean;
  onClose: () => void;
  onNext: () => void;
}

export const TwoFASetupDialog = ({
  open,
  onClose,
  onNext,
}: TwoFASetupDialogProps) => {
  const { isQRCodeSetup, setQRCodeVariant, setManualVariant } =
    useTwoFASetupVariant();

  const { twoFAsetupDataState, fetch } = useTwoFASetupData();

  const { classes } = useTwoFASetupDialogStyles();

  const handleClose = useCallback(() => {
    onClose();

    // timeout to avoid dialog blinking
    setTimeout(setQRCodeVariant, 300);
  }, [onClose, setQRCodeVariant]);

  const handleNextClick = useCallback(() => {
    handleClose();
    onNext();
  }, [handleClose, onNext]);

  const title = useTitle(
    isQRCodeSetup,
    twoFAsetupDataState?.isError,
    twoFAsetupDataState?.isLoading,
  );

  return (
    <Dialog
      maxPxWidth={600}
      open={open}
      onClose={handleClose}
      title={<span className={classes.title}>{title}</span>}
    >
      <Queries<UserSettingsSetupTwoFAResult>
        isPreloadDisabled
        queryStates={[twoFAsetupDataState]}
        disableErrorRender
      >
        {({ error }) => {
          if (error) {
            return (
              <TwoFAControlDialogError
                handleClose={handleClose}
                handleClick={fetch}
              />
            );
          }

          return (
            <Box className={classes.root}>
              {isQRCodeSetup ? (
                <TwoFAInfo>
                  <TwoFASetupButtonSwitcher onClick={setManualVariant} />
                </TwoFAInfo>
              ) : (
                <ManualTwoFAInfo />
              )}
              <Button
                onClick={handleNextClick}
                size="large"
                className={classes.button}
              >
                {t(`${USER_SETTINGS_INTL_ROOT}.setup-dialog.button`)}
              </Button>

              {!isQRCodeSetup && (
                <Button
                  onClick={setQRCodeVariant}
                  size="large"
                  variant="outlined"
                  className={classes.backButton}
                >
                  {t(`${USER_SETTINGS_INTL_ROOT}.setup-dialog.button-back`)}
                </Button>
              )}
            </Box>
          );
        }}
      </Queries>
    </Dialog>
  );
};
