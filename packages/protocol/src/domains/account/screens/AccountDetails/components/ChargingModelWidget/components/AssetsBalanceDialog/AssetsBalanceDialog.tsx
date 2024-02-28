import { t, tHTML } from '@ankr.com/common';
import { Typography } from '@mui/material';

import { Dialog } from 'uiKit/Dialog';
import { ASSETS_BALANCE_LEARN_MORE_LINK } from 'modules/common/constants/const';

import { intlRoot } from '../../const';
import { useAssetsDialogStyles } from './useAssetsDialogStyles';

interface IAssetsBalanceDialogProps {
  isOpened: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const AssetsBalanceDialog = ({
  isOpened,
  onClose,
  children,
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
        {tHTML(`${intlRoot}.assets-balance-dialog.description`, {
          href: ASSETS_BALANCE_LEARN_MORE_LINK, // TODO: add link
        })}
      </Typography>
      {children}
    </Dialog>
  );
};
