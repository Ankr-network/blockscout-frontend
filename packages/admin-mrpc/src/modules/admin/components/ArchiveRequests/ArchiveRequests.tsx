import { CSVLink } from 'react-csv';
import { Box, Button, Input, Paper, Typography } from '@mui/material';
import { LoadingButton } from '@ankr.com/ui';
import { ChainSelect } from 'modules/common/components/ChainSelect/ChainSelect';
import { useChainSelect } from 'modules/common/components/ChainSelect/useChainSelect';
import { useArchiveRequestsStats } from './useArchiveRequestsStats';
import { useUserName } from './useUserName';

export const ArchiveRequests = () => {
  const {
    selectedChainId,
    handleSelectChain,
    isLoadingBlockchains,
    blockchainsData,
  } = useChainSelect();

  const { dataArchiveRequestsStats, isLoadingArchiveRequests, requestStats } =
    useArchiveRequestsStats({
      blockchain: selectedChainId,
    });

  const { userInputValue, onChange } = useUserName();

  const isLoading = isLoadingBlockchains || isLoadingArchiveRequests;

  return (
    <Paper sx={{ p: 8, mt: 8, mb: 8 }}>
      <Typography variant="h4" mb={6}>
        Get archive requests statistics
      </Typography>

      <Typography variant="subtitle2" mb={2} display="block">
        Requests for user (optional)
      </Typography>
      <Box sx={{ maxWidth: '380px' }}>
        <Input
          fullWidth
          sx={theme => ({
            backgroundColor: theme.palette.background.default,
            mb: 4,
          })}
          placeholder="User address"
          onChange={onChange}
          value={userInputValue}
          disabled={isLoading}
          size="small"
          disableUnderline
          color="secondary"
        />
      </Box>

      <Typography variant="subtitle2" mb={2} display="block">
        Choose blockchain
      </Typography>
      <Box sx={{ maxWidth: '225px' }}>
        <ChainSelect
          selectedChainId={selectedChainId}
          handleSelectChain={handleSelectChain}
          isLoadingBlockchains={isLoading}
          blockchainsData={blockchainsData}
        />
      </Box>

      <LoadingButton
        loading={isLoading}
        disabled={!selectedChainId}
        size="large"
        sx={{ mt: 6 }}
        onClick={requestStats}
      >
        Request
      </LoadingButton>

      <Box sx={{ mt: 6 }}>
        {isLoading && <>Loading...</>}

        {!isLoading && dataArchiveRequestsStats && (
          <>
            <Button size="large">
              <CSVLink data={[dataArchiveRequestsStats]}>Download CSV</CSVLink>
            </Button>
            <br />
            <br />
            <Typography variant="body2">
              {JSON.stringify(dataArchiveRequestsStats, null, 2)}
            </Typography>
          </>
        )}
      </Box>

      {!isLoading && !dataArchiveRequestsStats && <>No data</>}
    </Paper>
  );
};
