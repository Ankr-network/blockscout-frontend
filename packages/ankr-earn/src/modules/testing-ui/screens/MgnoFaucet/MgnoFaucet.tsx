import { Box, Grid, Typography } from '@material-ui/core';
import { useMutation, useQuery } from '@redux-requests/react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { configFromEnv } from 'modules/api/config';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { getBalance } from 'modules/stake-mgno/actions/getBalance';
import { getTestMgnoTokens } from 'modules/stake-mgno/actions/getTestMgnoTokens';
import { TestBox } from 'modules/testing-ui/components/TestBox';
import { Button } from 'uiKit/Button';

const { contractConfig } = configFromEnv();

export const MgnoFaucet = (): JSX.Element => {
  const dispatch = useDispatch();

  const { loading: isTestTokensLoading } = useMutation({
    type: getTestMgnoTokens,
  });

  const { data: mgnoBalance, loading: isMgnoBalanceLoading } = useQuery({
    type: getBalance,
  });

  const onClick = useCallback(() => {
    dispatch(getTestMgnoTokens());
  }, [dispatch]);

  useProviderEffect(() => {
    dispatch(getBalance());
  }, []);

  const testMgnoBalance =
    mgnoBalance && !isMgnoBalanceLoading ? mgnoBalance.toFormat() : '...';

  return (
    <TestBox>
      <Box mb={4}>
        <Typography variant="h3">Mgno Faucet</Typography>
      </Box>

      <Box mb={3}>
        <Box mb={2}>
          <Typography variant="h4">Mgno test tokens</Typography>
        </Box>

        <Box mb={2}>
          <Typography color="textSecondary" variant="body2">
            {'address: '}

            <Typography color="textPrimary" component="code" variant="caption">
              {contractConfig.mGNOToken}
            </Typography>
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item>
            <Button
              disabled={isTestTokensLoading}
              isLoading={isTestTokensLoading}
              onClick={onClick}
            >
              Get test Mgno tokens
            </Button>
          </Grid>

          <Grid item>
            <Typography color="textSecondary" variant="body2">
              Your balance:
            </Typography>

            <Typography variant="body2">{testMgnoBalance}</Typography>
          </Grid>
        </Grid>
      </Box>
    </TestBox>
  );
};
