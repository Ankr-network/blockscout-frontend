import { Typography } from '@mui/material';

import { usePromoLabelStyles } from './usePromoLabelStyles';

interface IPromoLabelProps {
  className?: string;
  label: string;
}

export const PromoLabel = ({ className, label }: IPromoLabelProps) => {
  const { classes, cx } = usePromoLabelStyles();

  return (
    // className promo is set globally in order to assign styles for active tab case
    <div className={cx('promo', classes.promoLabelRoot, className)}>
      <Typography className={classes.promoLabel} variant="body3">
        {label}
      </Typography>
    </div>
  );
};
