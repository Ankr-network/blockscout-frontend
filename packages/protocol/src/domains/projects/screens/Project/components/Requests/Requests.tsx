import { Typography } from '@mui/material';
import { Dashboard } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { Variant } from '@mui/material/styles/createTypography';

import { TimeframeTabs } from 'domains/chains/screens/ChainItem/components/TimeframeTabs';
import { TabSize } from 'modules/common/components/SecondaryTab';
import { NavLink } from 'uiKit/NavLink';
import { DashboardRoutesConfig } from 'domains/dashboard/routes';

import { PaperBlock } from '../PaperBlock';
import { useRequestsStyles } from './useRequestsStyles';
import { useRequests } from '../../hooks/useRequests';
import { RequestsInfo } from './components/RequestsInfo';

interface RequestsProps {
  className?: string;
}

export const Requests = ({ className }: RequestsProps) => {
  const { classes } = useRequestsStyles();

  const {
    timeframe,
    timeframeTabs,
    requestsChartData,
    isLoading,
    totalRequestsCount,
  } = useRequests();

  return (
    <PaperBlock className={className}>
      <div className={classes.top}>
        <div className={classes.left}>
          <Typography
            variant={'subtitle3' as Variant}
            className={classes.title}
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
          startIcon={<Dashboard />}
          variant="outlined"
          className={classes.button}
          size="small"
          href={DashboardRoutesConfig.dashboard.generatePath()}
        >
          {t('project.total-requests.dashboard-button')}
        </NavLink>
      </div>
      <RequestsInfo
        data={requestsChartData}
        isLoading={isLoading}
        totalRequestsCount={totalRequestsCount}
      />
    </PaperBlock>
  );
};
