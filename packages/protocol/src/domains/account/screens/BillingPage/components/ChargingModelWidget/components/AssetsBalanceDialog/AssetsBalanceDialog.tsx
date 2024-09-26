import { Link, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { CHARGING_MODELS_LINK } from 'domains/account/const';
import { Dialog } from 'uiKit/Dialog';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { intlRoot } from '../../const';
import { useAssetsDialogStyles } from './useAssetsDialogStyles';
import { assetsBalanceDialogTranslation } from './translation';

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
  const { keys } = useTranslation(assetsBalanceDialogTranslation);
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
        {t(`${intlRoot}.assets-balance-dialog.description`)}
        <Link
          className={classes.link}
          href={CHARGING_MODELS_LINK}
          target="_blank"
        >
          {t(keys.learnMoreLink)}
        </Link>
      </Typography>
      {children}
    </Dialog>
  );
};
