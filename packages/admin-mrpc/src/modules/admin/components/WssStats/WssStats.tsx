import { CSVLink } from 'react-csv';
import { Box, Button, Paper, Typography } from '@mui/material';
import { LoadingButton } from '@ankr.com/ui';

import { ChainSelect } from 'modules/common/components/ChainSelect/ChainSelect';
import { useChainSelect } from 'modules/common/components/ChainSelect/useChainSelect';

import { useWssStats } from './useWssStats';

export const WssStats = () => {
  const {
    selectedChainId,
    handleSelectChain,
    isLoadingBlockchains,
    blockchainsData,
  } = useChainSelect();

  const { dataWebsocketStats, isLoadingWebsocket, requestStats } = useWssStats({
    blockchain: selectedChainId,
  });

  const isLoading = isLoadingBlockchains || isLoadingWebsocket;

  return (
    <Paper sx={{ p: 8, mt: 8, mb: 8 }}>
      <Typography variant="h4" mb={6}>
        Get Wss statistics
      </Typography>

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

        {!isLoading && dataWebsocketStats && (
          <>
            <Button size="large">
              <CSVLink data={[dataWebsocketStats]}>Download CSV</CSVLink>
            </Button>
            <br />
            <br />
            <Typography variant="body2">
              {JSON.stringify(dataWebsocketStats, null, 2)}
            </Typography>
          </>
        )}
      </Box>

      {!isLoading && !dataWebsocketStats && <>No data</>}
    </Paper>
  );
};
