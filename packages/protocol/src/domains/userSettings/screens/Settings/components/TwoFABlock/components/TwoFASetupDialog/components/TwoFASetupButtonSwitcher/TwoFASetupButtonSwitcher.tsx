import { tHTML } from '@ankr.com/common';
import { Button } from '@mui/material';

import { useTwoFASetupButtonSwitcherStyles } from './TwoFASetupButtonSwitcherStyles';
import { USER_SETTINGS_INTL_ROOT } from '../../../../constants';

interface TwoFASetupButtonSwitcherProps {
  onClick: () => void;
}

export const TwoFASetupButtonSwitcher = ({
  onClick,
}: TwoFASetupButtonSwitcherProps) => {
  const { classes } = useTwoFASetupButtonSwitcherStyles();

  return (
    <Button
      className={classes.link}
      variant="text"
      onClick={onClick}
      size="small"
    >
      <span>(</span>
      {tHTML(`${USER_SETTINGS_INTL_ROOT}.setup-dialog.info.scan-problem`)}
      <span>)</span>
    </Button>
  );
};
