import { t, tHTML } from '@ankr.com/common';
import { Typography } from '@mui/material';

import { Dialog } from 'uiKit/Dialog';

import { intlRoot } from '../../const';
import { useAssetsDialogStyles } from './useAssetsDialogStyles';

interface IAssetsBalanceDialogProps {
  isOpened: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const AssetsBalanceDialog = ({
  children,
  isOpened,
  onClose,
}: IAssetsBalanceDialogProps) => {
  const { classes } = useAssetsDialogStyles();

  return (
    <Dialog
      onClose={onClose}
      open={isOpened}
      title={t(`${intlRoot}.assets-balance-dialog.title`)}
      paperClassName={classes.paperRoot}
    >
      <Typography
        className={classes.description}
        color="textSecondary"
        variant="body2"
        component="p"
      >
        {tHTML(`${intlRoot}.assets-balance-dialog.description`)}
      </Typography>
      {children}
    </Dialog>
  );
};
