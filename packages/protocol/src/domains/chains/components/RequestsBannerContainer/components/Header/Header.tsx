import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { StatusCircle } from 'uiKit/StatusCircle';
import { Tab } from 'modules/common/hooks/useTabs';
import { Timeframe } from 'domains/chains/types';
import { TimeframeTabs } from 'domains/chains/screens/ChainItem/components/TimeframeTabs';
import { TabSize } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { useHeaderStyles } from './useHeaderStyles';

interface IFailedRequestsHeaderProps {
  total: string;
  timeframe: Timeframe;
  timeframeTabs: Tab<Timeframe>[];
}

export const Header = ({
  total,
  timeframe,
  timeframeTabs,
}: IFailedRequestsHeaderProps) => {
  const { classes } = useHeaderStyles();

  return (
    <div className={classes.information}>
      <Typography variant="h6" component="div" className={classes.title}>
        <span className={classes.title}>{t(`requests-banner.title`)}</span>
      </Typography>
      <TimeframeTabs
        size={TabSize.ExtraSmall}
        className={classes.timeframeTabs}
        tabs={timeframeTabs}
        timeframe={timeframe}
      />
      <div className={classes.infoTitle}>
        <div className={classes.sectionTitle}>
          <StatusCircle size="md" />
          <Typography className={classes.text}>
            {t(`requests-banner.total-request`)}
          </Typography>
          <Typography className={classes.info}>
            {t(`requests-banner.value`, {
              value: total,
            })}
          </Typography>
        </div>
      </div>
    </div>
  );
};
