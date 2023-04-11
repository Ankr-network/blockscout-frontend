import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { Switcher } from 'modules/common/components/Switcher';
import { StatusCircle } from 'uiKit/StatusCircle';
import { intlFailedRequestsBannerRoot } from '../Tooltip';
import { useHeaderStyles } from '../../../RequestsBannerContainer/components/Header/useHeaderStyles';

interface IFailedRequestsHeaderProps {
  switchValue: string;
  total?: string;
  rate: string;
  rejectedRequestsCount: string;
}

export const Header = ({
  switchValue,
  total,
  rate,
  rejectedRequestsCount,
}: IFailedRequestsHeaderProps) => {
  const { classes } = useHeaderStyles();

  return (
    <div className={classes.information}>
      <Typography variant="subtitle1" component="div" className={classes.title}>
        <span className={classes.title}>
          {t(`${intlFailedRequestsBannerRoot}.title`)}
        </span>
        <Switcher value={switchValue} />
      </Typography>
      <div className={classes.infoTitle}>
        <div className={classes.sectionTitle}>
          <StatusCircle size="md" />
          <Typography className={classes.text}>
            {t(`${intlFailedRequestsBannerRoot}.total-request`)}
          </Typography>
          <Typography className={classes.info}>
            {t(`${intlFailedRequestsBannerRoot}.value`, {
              value: total,
            })}
          </Typography>
        </div>
        <div className={classes.sectionTitle}>
          <StatusCircle size="md" status="error" />
          <Typography className={classes.text}>
            {t(`${intlFailedRequestsBannerRoot}.rate-limit-rejections`)}
          </Typography>
          <Typography className={classes.info}>
            {t(`${intlFailedRequestsBannerRoot}.value`, {
              value: rejectedRequestsCount,
            })}
            {t(`${intlFailedRequestsBannerRoot}.rate`, { rate })}
          </Typography>
        </div>
      </div>
    </div>
  );
};
