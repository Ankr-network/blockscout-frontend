import { useFailedBannerStyles } from './useFailedBannerStyles';
import warningIcon from './assets/warning.png';

export const FailedBanner = () => {
  const { classes } = useFailedBannerStyles();

  return (
    <div className={classes.root}>
      <img alt="Warning icon" height={256} src={warningIcon} width={246} />
    </div>
  );
};
