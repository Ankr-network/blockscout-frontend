import { Dashboard } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { t } from '@ankr.com/common';

import { DashboardRoutesConfig } from 'domains/dashboard/routes';
import { NavLink } from 'uiKit/NavLink';
import { TabSize } from 'modules/common/components/SecondaryTab';
import { TimeframeTabs } from 'domains/chains/screens/ChainItem/components/TimeframeTabs';

import { PaperBlock } from '../PaperBlock';
import { RequestsInfo } from './components/RequestsInfo';
import { useRequests } from '../../hooks/useRequests';
import { useRequestsStyles } from './useRequestsStyles';

interface RequestsProps {
  className?: string;
}

export const Requests = ({ className }: RequestsProps) => {
  const { classes } = useRequestsStyles();

  const {
    isLoading,
    relativeChange,
    requestsChartData,
    requestsCount,
    timeframe,
    timeframeTabs,
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
        relativeChange={relativeChange}
        totalRequestsCount={requestsCount}
      />
    </PaperBlock>
  );
};
