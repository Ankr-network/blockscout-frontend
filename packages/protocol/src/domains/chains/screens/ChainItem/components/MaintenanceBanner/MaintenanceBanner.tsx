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
          Dear users, you might have experienced the incorrect statistics shown
          starting from August&nbsp;1. We&rsquo;ve already identified the issue,
          and it&nbsp;will be&nbsp;fixed soon. On&nbsp;the bright
          side&nbsp;&mdash; the issue hasn&rsquo;t affected the correctness
          of&nbsp;PAYG charging. We&nbsp;apologize for the inconvenience.
        </div>
      </div>
    </div>
  );
};
