import { Greeting } from './components/Greeting';
import {
  ReferralCodeWidget,
  useReferralCodeWidget,
} from '../ReferralCodeWidget';
import { useTopBannerStyles } from './useTopBannerStyles';

export const TopBanner = () => {
  const { referralCodeWidgetProps: widgetProps } = useReferralCodeWidget();

  const { classes } = useTopBannerStyles();

  return (
    <div className={classes.root}>
      <div className={classes.banner}>
        <div className={classes.content}>
          <Greeting className={classes.greeting} />
          <ReferralCodeWidget className={classes.widget} {...widgetProps} />
        </div>
      </div>
      <ReferralCodeWidget className={classes.mobileWidget} {...widgetProps} />
    </div>
  );
};
