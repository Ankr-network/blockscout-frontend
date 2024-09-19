import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { NavBarAnalytics } from '@ankr.com/ui';
import { IChartData, Timeframe } from '@ankr.com/telemetry';

import { NavLink } from 'uiKit/NavLink';
import { TimeframeTabs } from 'domains/chains/screens/ChainPage/components/TimeframeTabs';
import { PaperBlock } from 'domains/projects/screens/Project/components/PaperBlock';
import { useRequestsWidgetStyles } from 'modules/common/components/RequestsWidget/useRequestsWidgetStyles';
import { DashboardRoutesConfig } from 'domains/dashboard/routes';
import { RequestsInfo } from 'domains/projects/screens/Project/components/Requests/components/RequestsInfo';
import { TabSize } from 'modules/common/components/SecondaryTab';
import { Tab } from 'uiKit/TabsManager';

interface IRequestsWidgetProps {
  isLoading: boolean;
  relativeChange?: number;
  requestsChartData: IChartData[];
  requestsCount: number;
  timeframe: Timeframe;
  timeframeTabs: Tab<Timeframe>[];
  className?: string;
  isDisabled?: boolean;
  width?: string | number;
}

export const RequestsWidget = ({
  className,
  isDisabled,
  isLoading,
  relativeChange,
  requestsChartData,
  requestsCount,
  timeframe,
  timeframeTabs,
  width,
}: IRequestsWidgetProps) => {
  const { classes } = useRequestsWidgetStyles();

  return (
    <PaperBlock className={className}>
      <div className={classes.top}>
        <div className={classes.left}>
          <Typography
            variant="subtitle3"
            className={classes.title}
            color="textSecondary"
          >
            {t('project.total-requests.title')}
          </Typography>
          <TimeframeTabs
            className={classes.timeframe}
            tabClassName={classes.tab}
            tabs={timeframeTabs}
            timeframe={timeframe}
            size={TabSize.ExtraSmall}
          />
        </div>

        <NavLink
          startIcon={<NavBarAnalytics className={classes.icon} />}
          variant="outlined"
          className={classes.button}
          size="small"
          href={DashboardRoutesConfig.dashboard.generatePath()}
        >
          {t('project.total-requests.analytics-button')}
        </NavLink>
      </div>
      <RequestsInfo
        isDisabled={isDisabled}
        data={requestsChartData}
        isLoading={isLoading}
        relativeChange={relativeChange}
        totalRequestsCount={requestsCount}
        width={width}
        shouldShowZeroValues
      />
    </PaperBlock>
  );
};
