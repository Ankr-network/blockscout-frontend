import { Box, Tab, Tabs, Typography } from '@mui/material';
import { PrivateStatsInterval } from 'multirpc-sdk';

import { ClientTransactionsTable } from './ClientTransactions';
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
    isLoadingClients,
    currentClient,
    address,
    statsData,
    isLoadingStats,
    periodStatement,
    totalData,
    isLoadingTotal,
    value,
    handleChange,
    updateTimeframeParam,
    isFetchingStats,
    handleSwitchCurrent,
    isCurrentDayIncluded,
    isRangePeriod,
    clientsErrors,
  } = useClientDetailsPage();

  const { classes } = useClientDetailsStyles();

  if (!isLoadingClients && !currentClient) {
    return <>Client not found</>;
  }

  const fileName = `${new Date().toLocaleDateString('en-CA')}_${address}`;

  return (
    <>
      <ClientInfo
        address={address}
        currentClient={currentClient}
        isLoadingClients={isLoadingClients}
        totalData={totalData}
        isLoadingTotal={isLoadingTotal}
        clientsErrors={clientsErrors}
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
            <Tab className={classes.tab} disableRipple label="Billing" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ClientUsageTable
            fileName={fileName}
            currentPeriod={periodStatement}
            stats={statsData?.stats}
            usage={statsData?.usage}
            onUpdateTimeframe={updateTimeframeParam}
            isLoadingStats={isLoadingStats || isFetchingStats}
            handleSwitchCurrent={handleSwitchCurrent}
            isCurrentDayIncluded={isCurrentDayIncluded}
            isRangePeriod={isRangePeriod}
            isChartDataLoading={isLoadingStats || isFetchingStats}
            timeframe={mapPeriodToTimeframe[periodStatement]}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ClientTransactionsTable address={address} />
        </TabPanel>
      </>
    </>
  );
};
