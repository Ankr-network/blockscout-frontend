import { Box, Tab, Tabs, Typography } from '@mui/material';
import { PrivateStatsInterval } from 'multirpc-sdk';

import {
  ClientDeductionsTable,
  ClientDepositsTable,
} from './ClientTransactions';
import { ClientInfo } from './ClientInfo';
import { ClientUsageTable } from './ClientUsageTable';
import { CustomRange, useClientDetailsPage } from './useClientDetailsPage';
import { useClientDetailsStyles } from './ClientDetailsStyles';
import { Timeframe } from './RequestsChart/types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const { Hour, Day, Week, Month } = Timeframe;
const mapPeriodToTimeframe: Record<any, Timeframe> = {
  [CustomRange.current]: Month,
  [CustomRange.previous]: Month,
  [PrivateStatsInterval.HOUR]: Hour,
  [PrivateStatsInterval.DAY]: Day,
  [PrivateStatsInterval.WEEK]: Week,
  [PrivateStatsInterval.MONTH]: Month,
};

export const ClientDetailsPage = () => {
  const {
    isCurrentClientLoading,
    currentClient,
    address,
    statsData,
    isLoadingStats,
    isFetchingStats,
    csvStatsData,
    isLoadingCsvStats,
    isFetchingCsvStats,
    periodStatement,
    totalData,
    isLoadingTotal,
    value,
    handleChange,
    updateTimeframeParam,
    handleSwitchCurrent,
    isCurrentDayIncluded,
    isRangePeriod,
    userProjectsData,
    isLoadingUserProjects,
    dateFrom,
    onChangeFrom,
    dateTo,
    onChangeTo,
  } = useClientDetailsPage();

  const { classes } = useClientDetailsStyles();

  if (!isCurrentClientLoading && !currentClient) {
    return <>Client not found</>;
  }

  const fileName = `${new Date().toLocaleDateString('en-CA')}_${address}`;

  return (
    <>
      <ClientInfo
        address={address}
        currentClient={currentClient}
        isCurrentClientLoading={isCurrentClientLoading}
        totalData={totalData}
        isLoadingTotal={isLoadingTotal}
        userProjectsData={userProjectsData}
        isLoadingUserProjects={isLoadingUserProjects}
      />

      <>
        <Box sx={{ marginTop: 10 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="User statistics"
            TabIndicatorProps={{
              style: {
                display: 'none',
              },
            }}
          >
            <Tab className={classes.tab} disableRipple label="Usage" />
            <Tab className={classes.tab} disableRipple label="Deductions" />
            <Tab className={classes.tab} disableRipple label="Deposits" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ClientUsageTable
            fileName={fileName}
            currentPeriod={periodStatement}
            stats={statsData?.stats}
            isLoadingStats={isLoadingStats || isFetchingStats}
            isChartDataLoading={isLoadingStats || isFetchingStats}
            csvStats={csvStatsData?.stats}
            isLoadingCsvStats={isLoadingCsvStats || isFetchingCsvStats}
            usage={statsData?.usage}
            onUpdateTimeframe={updateTimeframeParam}
            handleSwitchCurrent={handleSwitchCurrent}
            isCurrentDayIncluded={isCurrentDayIncluded}
            isRangePeriod={isRangePeriod}
            timeframe={mapPeriodToTimeframe[periodStatement]}
            dateFrom={dateFrom}
            onChangeFrom={onChangeFrom}
            dateTo={dateTo}
            onChangeTo={onChangeTo}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ClientDeductionsTable address={address} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ClientDepositsTable address={address} />
        </TabPanel>
      </>
    </>
  );
};
