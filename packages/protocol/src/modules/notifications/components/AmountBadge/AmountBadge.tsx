import { Typography } from '@mui/material';

import { useAmountBadgeStyles } from './useAmountBadgeStyles';

interface IAmountBadgeProps {
  amount: number;
  isBig?: boolean;
  className?: string;
}

export const AmountBadge = ({
  amount,
  className,
  isBig = false,
}: IAmountBadgeProps) => {
  const { classes, cx } = useAmountBadgeStyles(isBig);

  return (
    <div className={cx(classes.root, className)}>
      <Typography
        className={classes.text}
        variant={isBig ? 'body4' : 'caption'}
      >
        {amount}
      </Typography>
    </div>
  );
};
