import { FormControlLabel, Switch } from '@mui/material';
import { t } from '@ankr.com/common';
import { useCallback, useState } from 'react';

import { useLazyUserSettingsFetchTwoFAStatusQuery } from 'domains/userSettings/actions/twoFA/fetchTwoFAStatus';

import { useTwoFASwitchStyles } from './TwoFASwitchStyles';
import { USER_SETTINGS_INTL_ROOT } from '../../constants';
import { TwoFASetupDialog } from '../TwoFASetupDialog';
import { TwoFAControlDialog } from '../TwoFAControlDialog';

interface TwoFASwitchProps {
  isEnabled: boolean;
}

export const TwoFASwitch = ({ isEnabled }: TwoFASwitchProps) => {
  const { classes } = useTwoFASwitchStyles();
  const [isManualCheckedTwoFA, setIsManualCheckedTwoFA] = useState(false);
  const [isControlDialogOpened, setIsControlDialogOpened] = useState(false);
  const [fetchTwoFAStatus] = useLazyUserSettingsFetchTwoFAStatusQuery();

  const handleSwitch = useCallback(
    (event: any, checked: boolean) => {
      if (isEnabled && !checked) {
        setIsControlDialogOpened(true);
      }

      setIsManualCheckedTwoFA(checked);
    },
    [isEnabled],
  );

  const handleClose = useCallback(() => {
    setIsManualCheckedTwoFA(false);
  }, []);

  const handleShowTwoFADialog = useCallback(() => {
    setIsControlDialogOpened(true);
  }, []);

  const isSwitchChecked = isEnabled || isManualCheckedTwoFA;
  const shouldShowSetupDialog = isManualCheckedTwoFA && !isEnabled;

  const onClose = useCallback(() => {
    setIsControlDialogOpened(false);

    fetchTwoFAStatus();
  }, [fetchTwoFAStatus]);

  return (
    <>
      <FormControlLabel
        classes={{
          root: classes.root,
          label: classes.label,
        }}
        control={
          <Switch
            checked={isSwitchChecked}
            classes={{
              checked: classes.switchChecked,
              track: classes.switchTrack,
            }}
            onChange={handleSwitch}
          />
        }
        label={t(`${USER_SETTINGS_INTL_ROOT}.label`)}
        labelPlacement="start"
      />
      {!isEnabled && (
        <TwoFASetupDialog
          open={shouldShowSetupDialog}
          onClose={handleClose}
          onNext={handleShowTwoFADialog}
        />
      )}
      <TwoFAControlDialog
        open={isControlDialogOpened}
        onClose={onClose}
        isEnabled={isEnabled}
      />
    </>
  );
};
