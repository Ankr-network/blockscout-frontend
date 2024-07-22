import { NavBarAnalytics } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { DashboardRoutesConfig } from 'domains/dashboard/routes';
import { NavLink } from 'uiKit/NavLink';
import { TabSize } from 'modules/common/components/SecondaryTab';
import { TimeframeTabs } from 'domains/chains/screens/ChainItem/components/TimeframeTabs';
import { useAppSelector } from 'store/useAppSelector';
import { selectHasFreemium } from 'domains/auth/store';

import { PaperBlock } from '../PaperBlock';
import { RequestsInfo } from './components/RequestsInfo';
import { useRequestsStyles } from './useRequestsStyles';
import { useRequests } from '../../hooks/useRequests';

interface RequestsProps {
  className?: string;
  isDisabled?: boolean;
}

export const Requests = ({ className, isDisabled }: RequestsProps) => {
  const isFreemium = useAppSelector(selectHasFreemium);

  const {
    isLoading,
    relativeChange,
    requestsChartData,
    requestsCount,
    timeframe,
    timeframeTabs,
  } = useRequests();

  const { classes } = useRequestsStyles();

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
          {!isFreemium && (
            <TimeframeTabs
              className={classes.timeframe}
              tabClassName={classes.tab}
              tabs={timeframeTabs}
              timeframe={timeframe}
              size={TabSize.ExtraSmall}
            />
          )}
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
      />
    </PaperBlock>
  );
};
