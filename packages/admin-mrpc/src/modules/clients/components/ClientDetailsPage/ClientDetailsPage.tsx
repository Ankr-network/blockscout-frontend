import { Box, Tab, Tabs, Typography } from '@material-ui/core';
import { useState } from 'react';

import { ClientsRoutesConfig } from '../../ClientsRoutesConfig';
import { useFetchCountersQuery } from '../../actions/fetchCounters';
import { useFetchUserTransactionsQuery } from '../../actions/fetchUserTransactions';
import { useFetchUserStatementQuery } from '../../actions/fetchUserStatement';
import { useFetchUserStatsQuery } from '../../actions/fetchUserStats';

import { ClientTransactionsTable } from './ClientTransactionsTable';
import { ClientInfo } from './ClientInfo';
import { ClientUsageTable } from './ClientUsageTable';

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
        <Box sx={{ mt: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const ClientDetailsPage = () => {
  const { address } = ClientsRoutesConfig.clientInfo.useParams();
  const { data: clients, isLoading: isLoadingClients } =
    useFetchCountersQuery();
  const { data: transactionsData, isLoading: isLoadingTransactions } =
    useFetchUserTransactionsQuery({ address });
  const { data: statementsData, isLoading: isLoadingStatement } =
    useFetchUserStatementQuery({ address });
  const { data: statsData, isLoading: isLoadingStats } = useFetchUserStatsQuery(
    { address },
  );

  const currentClient = clients?.counters?.filter(i => i.address === address);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  if (
    isLoadingClients ||
    isLoadingTransactions ||
    isLoadingStatement ||
    isLoadingStats
  ) {
    return <>Loading...</>;
  }

  if (!currentClient) {
    return <>Client not found</>;
  }

  return (
    <>
      <ClientInfo currentClient={currentClient} statsData={statsData} />

      {(transactionsData?.transactions || statementsData?.statement?.usage) && (
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 40 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="User statistics"
            >
              <Tab
                label="Transactions"
                disabled={!transactionsData?.transactions}
              />
              <Tab label="Usage" disabled={!statementsData?.statement.usage} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {transactionsData?.transactions ? (
              <ClientTransactionsTable
                transactions={transactionsData?.transactions}
              />
            ) : (
              'No information'
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {statementsData?.statement.usage ? (
              <ClientUsageTable usage={statementsData.statement.usage} />
            ) : (
              'No information'
            )}
          </TabPanel>
        </>
      )}
    </>
  );
};
