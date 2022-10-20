import { Box, Button } from '@mui/material';
import { useClientDetailsStyles } from './ClientDetailsStyles';
import { BlockchainID, PrivateStats } from 'multirpc-sdk';

interface IClientUsageChainFilterProps {
  stats?: PrivateStats;
  filterByChainValue?: BlockchainID;
  handleFilterByChain: (chain?: BlockchainID) => void;
  availableChains: BlockchainID[];
}

export const ClientUsageChainFilter = ({
  stats,
  filterByChainValue,
  handleFilterByChain,
  availableChains,
}: IClientUsageChainFilterProps) => {
  const { classes, cx } = useClientDetailsStyles();
  if (!stats?.stats) {
    return null;
  }
  const totalRequestsCount = stats?.totalRequests;
  return (
    <Box className={classes.chainFilters}>
      <Button
        color={!filterByChainValue ? 'primary' : 'secondary'}
        className={cx(
          classes.btnChainFilter,
          !filterByChainValue && classes.btnChainFilterActive,
        )}
        onClick={() => handleFilterByChain(undefined)}
      >
        All Requests{' '}
        <span className={classes.chainFilterValue}>({totalRequestsCount})</span>
      </Button>
      {availableChains.map(chain => {
        const currentChainStats = stats?.stats![chain];
        if (!currentChainStats?.totalRequests || !totalRequestsCount) {
          return null;
        }
        const currentChainUsagePercent =
          (currentChainStats?.totalRequests * 100) / totalRequestsCount;
        const currentChainUsagePercentString = `${
          Math.round(currentChainUsagePercent * 10) / 10
        }%`;
        return (
          <Button
            key={chain}
            color={chain === filterByChainValue ? 'primary' : 'secondary'}
            className={cx(
              classes.btnChainFilter,
              chain === filterByChainValue && classes.btnChainFilterActive,
            )}
            onClick={() => handleFilterByChain(chain)}
          >
            {chain}{' '}
            <span className={classes.chainFilterValue}>
              {currentChainUsagePercentString}
            </span>
          </Button>
        );
      })}
    </Box>
  );
};
