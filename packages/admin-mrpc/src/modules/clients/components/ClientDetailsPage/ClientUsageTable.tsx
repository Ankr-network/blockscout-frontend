import { useState } from 'react';
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
  Grid,
  Skeleton,
} from '@mui/material';
import { PrivateStats, PrivateStatsInterval } from 'multirpc-sdk';
import { useClientDetailsStyles } from './ClientDetailsStyles';
import { timeframeTextMap } from './const';
import { IUserEntityMapped } from '../../actions/fetchUserStats';
import { formatNumber } from '../../../common/utils/renderBalance';

type TabIndex = 0 | 1 | 2;
/* key is tab index, value is dayOffset param */
const timeframeParams: Record<TabIndex, PrivateStatsInterval> = {
  0: PrivateStatsInterval.DAY,
  1: PrivateStatsInterval.WEEK,
  2: PrivateStatsInterval.MONTH,
};

interface IClientUsageTableProps {
  currentPeriod: PrivateStatsInterval;
  stats?: PrivateStats;
  usage?: IUserEntityMapped[];
  onUpdateTimeframe: (timeframe: PrivateStatsInterval) => void;
  isLoadingStats?: boolean;
}

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

const TAB_INDEXES = Object.keys(timeframeParams);

const skeleton = (
  <Skeleton
    animation="wave"
    style={{ display: 'inline-block' }}
    variant="rectangular"
    width={100}
    height={16}
  />
);

export const ClientUsageTable = ({
  currentPeriod,
  stats,
  usage,
  onUpdateTimeframe,
  isLoadingStats,
}: IClientUsageTableProps) => {
  const [value, setValue] = useState<TabIndex>(0);

  const handleChange = (event: React.ChangeEvent<any>, newValue: TabIndex) => {
    onUpdateTimeframe(timeframeParams[newValue]);
    setValue(newValue);
  };

  const { classes } = useClientDetailsStyles();
  const totalCost = usage?.reduce((accumulator, object) => {
    return accumulator + (object?.totalCost ? +object?.totalCost : 0);
  }, 0);

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
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

      <Grid
        className={classes.gridContainer}
        container
        spacing={5}
        wrap="nowrap"
      >
        <Grid item xs={4} component={Paper} className={classes.gridItem}>
          <Typography variant="caption" color="textSecondary" component="p">
            Requests
          </Typography>
          {isLoadingStats ? (
            skeleton
          ) : (
            <>
              {stats?.totalRequests ? (
                <>
                  <Typography variant="subtitle1" component="p">
                    <b> {formatNumber(stats?.totalRequests)}</b>
                  </Typography>
                  <Typography variant="caption" component="p">
                    in one {timeframeTextMap[currentPeriod]}
                  </Typography>
                </>
              ) : (
                <Typography variant="subtitle1" component="p">
                  Not found
                </Typography>
              )}
            </>
          )}
        </Grid>
        <Grid item xs={4} component={Paper} className={classes.gridItem}>
          <Typography variant="caption" color="textSecondary" component="p">
            Total cost
          </Typography>
          {isLoadingStats ? (
            skeleton
          ) : (
            <>
              {totalCost ? (
                <>
                  <Typography variant="subtitle1" component="p">
                    <b> {formatNumber(totalCost)}</b>
                  </Typography>
                  <Typography variant="caption" component="p">
                    in one {timeframeTextMap[currentPeriod]}
                  </Typography>
                </>
              ) : (
                <Typography variant="subtitle1" component="p">
                  Not found
                </Typography>
              )}
            </>
          )}
        </Grid>
      </Grid>
      {usage
        ? TAB_INDEXES.map(tab => {
            return (
              <TabPanel key={tab} value={value} index={+tab}>
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
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {usage.map(i =>
                        i.details.map(d => (
                          <TableRow key={d.method}>
                            <TableCell>{i.blockchain}</TableCell>
                            <TableCell>{d.method}</TableCell>
                            <TableCell>{d.count}</TableCell>
                            <TableCell>{d.totalCost}</TableCell>
                          </TableRow>
                        )),
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
