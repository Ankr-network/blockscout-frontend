import { ReactComponent as FilledCardWithArrow } from 'uiKit/Icons/cardWithArrowFilled.svg';
import { useUpcomingUpdateBannerStyles } from './UpcomingUpdateBannerStyles';

export const UpcomingUpdateBanner = () => {
  const classes = useUpcomingUpdateBannerStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.icon}>
          <FilledCardWithArrow />
        </div>
        <div className={classes.message}>
          We’ve pegged the price of our API Credits to USD. That brings a couple
          of consequences:
          <br />
          &bull; ANKR deposits are to be calculated into API Credits based on
          the current ANKR/USD exchange rate.
          <br />
          &bull; Withdrawals are to be requested via Support only.
        </div>
      </div>
    </div>
  );
};
