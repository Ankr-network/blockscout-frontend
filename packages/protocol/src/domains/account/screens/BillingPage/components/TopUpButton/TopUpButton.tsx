import { Button, ButtonProps } from '@mui/material';
import { TopUp } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { useTopUpButtonStyles } from './TopUpButtonStyles';

export interface TopUpButtonProps {
  onClick: ButtonProps['onClick'];
}

export const TopUpButton = ({ onClick }: TopUpButtonProps) => {
  const {
    classes: { root, startIcon, text },
  } = useTopUpButtonStyles();

  return (
    <Button
      classes={{ root, startIcon }}
      onClick={onClick}
      variant="contained"
      startIcon={<TopUp />}
    >
      <div className={text}>{t('account.account-details.top-up-button')}</div>
    </Button>
  );
};
