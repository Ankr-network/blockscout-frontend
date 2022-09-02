import { useUSDBannerStyles } from './USDBannerStyles';
import { ReactComponent as CardIcon } from './card.svg';

export const USDBanner = () => {
  const classes = useUSDBannerStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.icon}>
          <CardIcon />
        </div>
        <div className={classes.message}>
          To&nbsp;continue using USD payments, please top up&nbsp;balance
          by&nbsp;$70.
        </div>
      </div>
    </div>
  );
};
