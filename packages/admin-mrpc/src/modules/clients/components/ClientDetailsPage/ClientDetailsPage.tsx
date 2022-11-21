import { Box, Tab, Tabs, Typography } from '@mui/material';

import { Spinner } from 'ui';

import { ClientTransactionsTable } from './ClientTransactions';
import { ClientInfo } from './ClientInfo';
import { ClientUsageTable } from './ClientUsageTable';
import { useClientDetailsPage } from './useClientDetailsPage';
import { useClientDetailsStyles } from './ClientDetailsStyles';

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

export const ClientDetailsPage = () => {
  const {
    isLoadingClients,
    currentClient,
    address,
    statsData,
    isLoadingTransactions,
    isLoadingStats,
    periodStatement,
    totalData,
    isLoadingTotal,
    value,
    handleChange,
    transactionsData,
    updateTimeframeParam,
    isFetchingStats,
    handleSwitchCurrent,
    isCurrentDayIncluded,
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
            <Tab
              className={classes.tab}
              disableRipple
              label="Billing"
              disabled={!transactionsData?.transactions}
            />
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
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {transactionsData?.transactions &&
          transactionsData?.transactions?.length > 0 ? (
            <ClientTransactionsTable
              transactions={transactionsData?.transactions}
            />
          ) : isLoadingTransactions ? (
            <Spinner
              className={classes.spinnerTransactions}
              centered={false}
              size={50}
            />
          ) : (
            'Not found'
          )}
        </TabPanel>
      </>
    </>
  );
};
