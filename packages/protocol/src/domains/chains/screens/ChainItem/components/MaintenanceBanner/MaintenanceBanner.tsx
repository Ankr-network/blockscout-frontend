import { useMaintenanceBannerStyles } from './MaintenanceBannerStyles';
import { ReactComponent as WarningIcon } from './warning.svg';

export const MaintenanceBanner = () => {
  const classes = useMaintenanceBannerStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.icon}>
          <WarningIcon />
        </div>
        <div className={classes.message}>
          Dear users, we&nbsp;have site maintenance work scheduled on
          <b>
            {' '}
            Monday, August 15&nbsp;from 3&nbsp;am to&nbsp;7&nbsp;am PDT.
          </b>{' '}
          During those hours, some functionality might be&nbsp;unavailable
          or&nbsp;work incorrectly. Endpoints aren&rsquo;t affected and are
          going to&nbsp;work as&nbsp;usual.
        </div>
      </div>
    </div>
  );
};
