import { Box, Grid, Typography } from '@material-ui/core';
import { VariantType } from 'notistack';
import { useDispatch } from 'react-redux';

import { showNotification } from 'modules/notifications';
import { TestBox } from 'modules/testing-ui/components/TestBox';
import { RoutesConfig } from 'modules/testing-ui/Routes';
import { Button } from 'uiKit/Button';
import { CloseButton } from 'uiKit/CloseButton';

export const Notifications = (): JSX.Element => {
  const dispatch = useDispatch();

  const handleShowNotification =
    (variant: VariantType = 'error') =>
    () => {
      dispatch(
        showNotification({
          key: `test_ERROR_${new Date().getTime()}`,
          message: 'test',
          variant,
          autoHideDuration: null,
        }),
      );
    };

  return (
    <TestBox>
      <Typography variant="h3">Notifications test</Typography>

      <Box mt={3}>
        <Grid container spacing={2}>
          <Grid item>
            <Button onClick={handleShowNotification()}>Error</Button>
          </Grid>

          <Grid item>
            <Button onClick={handleShowNotification('success')}>success</Button>
          </Grid>

          <Grid item>
            <Button onClick={handleShowNotification('warning')}>warning</Button>
          </Grid>
        </Grid>
      </Box>

      <CloseButton href={RoutesConfig.main.generatePath()} />
    </TestBox>
  );
};
