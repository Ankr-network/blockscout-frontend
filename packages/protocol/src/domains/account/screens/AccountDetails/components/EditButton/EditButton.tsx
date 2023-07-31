import { Button, ButtonProps } from '@mui/material';
import { Edit } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { useEditButtonStyles } from './EditButtonStyles';

export interface EditButtonProps {
  onClick: ButtonProps['onClick'];
}

export const EditButton = ({ onClick }: EditButtonProps) => {
  const {
    classes: { root, startIcon, text },
  } = useEditButtonStyles();

  return (
    <Button
      classes={{ root, startIcon }}
      onClick={onClick}
      startIcon={<Edit />}
      variant="outlined"
    >
      <div className={text}>{t('account.account-details.edit-button')}</div>
    </Button>
  );
};
