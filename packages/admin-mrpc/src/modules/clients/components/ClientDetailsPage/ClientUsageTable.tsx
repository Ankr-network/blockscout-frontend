import {
  Paper,
  Table,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import { Spinner } from 'ui';
import { useClientDetailsStyles } from './ClientDetailsStyles';
import {
  useClientUsageTable,
  IClientUsageTableProps,
} from './useClientUsageTable';
import { ClientUsageTotal } from './ClientUsageTotal';
import { ClientUsageChainFilter } from './ClientUsageChainFilter';

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

export const ClientUsageTable = ({
  currentPeriod,
  stats,
  usage,
  onUpdateTimeframe,
  isLoadingStats,
}: IClientUsageTableProps) => {
  const {
    activeTabIndex,
    handleChangeActiveTab,
    totalCost,
    filterByChainValue,
    availableChains,
    handleFilterByChain,
    dataToRender,
    TAB_INDEXES,
    totalRequestsValue,
    totalCostsValue,
    maxCountTotal,
  } = useClientUsageTable({ onUpdateTimeframe, stats, usage, currentPeriod });

  const { classes } = useClientDetailsStyles();

  return (
    <>
      <Tabs
        value={activeTabIndex}
        onChange={handleChangeActiveTab}
        TabIndicatorProps={{
          style: {
            display: 'none',
          },
        }}
        className={classes.tabsWrapper}
      >
        <Tab className={classes.tabUsagePeriod} disableRipple label="24h" />
        <Tab className={classes.tabUsagePeriod} disableRipple label="7d" />
        <Tab className={classes.tabUsagePeriod} disableRipple label="30d" />
      </Tabs>

      {isLoadingStats ? (
        <>
          <br />
          <Spinner centered={false} size={42} />
        </>
      ) : (
        <ClientUsageChainFilter
          stats={stats}
          filterByChainValue={filterByChainValue}
          handleFilterByChain={handleFilterByChain}
          availableChains={availableChains}
        />
      )}

      <ClientUsageTotal
        currentPeriod={currentPeriod}
        isLoadingStats={isLoadingStats}
        totalRequestsValue={totalRequestsValue}
        totalCostsValue={totalCostsValue}
        totalCost={totalCost}
      />

      {usage
        ? TAB_INDEXES.map(tab => {
            return (
              <TabPanel key={tab} value={activeTabIndex} index={+tab}>
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="actions table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <b>BlockChain</b>
                        </TableCell>
                        <TableCell>
                          <b>Method</b>
                        </TableCell>
                        <TableCell>
                          <b>Count</b>
                        </TableCell>
                        <TableCell>
                          <b>Total cost</b>
                        </TableCell>
                        <TableCell>
                          <b>usage percentage</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataToRender?.map(i =>
                        i.details.map(d => {
                          const usagePercent = maxCountTotal
                            ? (+d.count * 100) / maxCountTotal
                            : 0;
                          return (
                            <TableRow key={d.method}>
                              <TableCell>{i.blockchain}</TableCell>
                              <TableCell>{d.method}</TableCell>
                              <TableCell>{d.count}</TableCell>
                              <TableCell>{d.totalCost}</TableCell>
                              <TableCell>
                                <Box
                                  className={classes.progressbar}
                                  style={{ width: `${usagePercent}%` }}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        }),
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
            );
          })
        : isLoadingStats
        ? 'Loading'
        : 'Not found'}
    </>
  );
};
