import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { format } from 'date-fns';

import { useHeaderStyles } from './useHeaderStyles';

export interface IHeaderProps {
  className?: string;
  txDate?: Date;
}

export const Header = ({ className, txDate }: IHeaderProps) => {
  const { classes, cx } = useHeaderStyles();

  const formattedDate = txDate ? format(txDate, 'MMM d Y HH:mm') : '';
  const subtitle = t('account.success-crypto-payment-dialog.subtitle', {
    date: formattedDate,
  });

  return (
    <div className={cx(classes.root, className)}>
      <Typography className={classes.title} variant="h5">
        {t('account.success-crypto-payment-dialog.title')}
      </Typography>
      {txDate && (
        <Typography className={classes.subtitle} variant="body3">
          {subtitle}
        </Typography>
      )}
    </div>
  );
};
