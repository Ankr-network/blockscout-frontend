import { Box, Typography } from '@material-ui/core';
import { INDEX_PATH } from 'modules/common/const';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import React from 'react';
import { Container } from 'uiKit/Container';
import { DisconnectBtn } from './components/DisconnectBtn/DisconnectBtn';
import { GuardRoute } from './components/GuardRoute/GuardRoute';

/**
 * ! It is just a demo
 * todo: remove it after some stake module will be added
 */

const ROOT = `${INDEX_PATH}/stake/demo`;

export const RoutesConfig = createRouteConfig({}, ROOT);

export function getRoutes() {
  return (
    <GuardRoute path={RoutesConfig.root} exact>
      <DefaultLayout>
        <Box component="section">
          <Container>
            <Box mb={3}>
              <Typography variant="h2">Do staking</Typography>
            </Box>

            <DisconnectBtn />
          </Container>
        </Box>
      </DefaultLayout>
    </GuardRoute>
  );
}
