import { CreditCard } from '@ankr.com/ui';
import { useUSDBannerStyles } from './USDBannerStyles';

export const USDBanner = () => {
  const { classes } = useUSDBannerStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div>
          <CreditCard className={classes.icon} />
        </div>
        <div className={classes.message}>
          To&nbsp;continue using USD payments, please top up&nbsp;balance
          by&nbsp;$70.
        </div>
      </div>
    </div>
  );
};
