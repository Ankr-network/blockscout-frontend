import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { ClientsRoutesConfig } from 'modules/clients/ClientsRoutesConfig';
import { useFetchCountersQuery } from 'modules/clients/actions/fetchCounters';
import { useFetchUserTransactionsQuery } from 'modules/clients/actions/fetchUserTransactions';
import { useFetchUserStatementQuery } from 'modules/clients/actions/fetchUserStatement';
import { useFetchUserStatsQuery } from 'modules/clients/actions/fetchUserStats';

import { ClientTransactionsTable } from './ClientTransactionsTable';
import { ClientInfo } from './ClientInfo';
import { ClientUsageTable } from './ClientUsageTable';
import { Spinner } from 'ui';
import { useClientDetailsStyles } from './ClientDetailsStyles';
import { TimeframeUsage } from './types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TRANSACTION_TYPE_DEDUCTION = 'TRANSACTION_TYPE_DEDUCTION';

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
  const { address } = ClientsRoutesConfig.clientInfo.useParams();
  useSetBreadcrumbs([
    {
      title: 'clients',
      link: ClientsRoutesConfig.clients.generatePath(),
    },
    {
      title: `${shrinkAddress(address)}`,
    },
  ]);

  const [periodStatement, setPeriodStatement] = useState<TimeframeUsage>('0');

  const { data: clients, isLoading: isLoadingClients } =
    useFetchCountersQuery();
  const { data: transactionsData, isLoading: isLoadingTransactions } =
    useFetchUserTransactionsQuery({ address });
  const {
    data: statementsData,
    isLoading: isLoadingStatement,
    isFetching: isFetchingStatement,
  } = useFetchUserStatementQuery({ address, dayOffset: periodStatement });
  const { data: statsData, isLoading: isLoadingStats } = useFetchUserStatsQuery(
    { address },
  );

  const { classes } = useClientDetailsStyles();

  const transactionsDeduction = transactionsData?.transactions.filter(
    i => i.type === TRANSACTION_TYPE_DEDUCTION,
  );
  const transactionsCost = transactionsDeduction?.reduce(
    (partialSum, a) => partialSum + +a.amountUsd,
    0,
  );
  const currentClient = clients?.counters?.filter(i => i.address === address);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  if (!isLoadingClients && !currentClient) {
    return <>Client not found</>;
  }

  const updateTimeframeParam = (timeframe: TimeframeUsage) => {
    setPeriodStatement(timeframe);
  };

  return (
    <>
      <ClientInfo
        address={address}
        currentClient={currentClient}
        statsData={statsData}
        transactionsCost={transactionsCost}
        isLoadingClients={isLoadingClients}
        isLoadingTransactions={isLoadingTransactions}
        isLoadingStats={isLoadingStats}
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
            <Tab
              className={classes.tab}
              disableRipple
              label="Transactions"
              disabled={!transactionsData?.transactions}
            />
            <Tab className={classes.tab} disableRipple label="Usage" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
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
        <TabPanel value={value} index={1}>
          {isLoadingStatement && 'Loading...'}
          <ClientUsageTable
            usage={statementsData?.statement.usage}
            onUpdateTimeframe={updateTimeframeParam}
            isLoading={isLoadingStatement || isFetchingStatement}
          />
        </TabPanel>
      </>
    </>
  );
};
