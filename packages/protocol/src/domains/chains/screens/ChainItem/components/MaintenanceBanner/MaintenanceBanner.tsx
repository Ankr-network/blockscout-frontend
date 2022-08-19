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
          starting from August&nbsp;1. We&rsquo;ve already identified the source
          of&nbsp;the issue and brought all effort into fixing&nbsp;it. Until
          then, the 7d/30d timeframe feature will be&nbsp;disabled. On&nbsp;the
          bright side&nbsp;&mdash; the issue hasn&rsquo;t affected the
          correctness of&nbsp;PAYG charging. We&nbsp;apologize for the
          inconvenience and are doing our best to&nbsp;fix it&nbsp;ASAP!
        </div>
      </div>
    </div>
  );
};
