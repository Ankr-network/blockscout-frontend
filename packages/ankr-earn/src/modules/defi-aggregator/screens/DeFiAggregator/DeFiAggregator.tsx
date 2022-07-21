import { Box } from '@material-ui/core';
import React, { ReactNode } from 'react';

import { Container } from 'uiKit/Container';

import { TRouteConfig } from '../../../router/utils/createRouteConfig';
import { Table, Filters } from '../../components';
import { useDeFiAggregator } from '../../hooks';

type RouteConfig = TRouteConfig<{
  defi: {
    useParams: () => Record<string, string[]>;
  };
}>;

interface IDeFiAggregatorProps {
  children?: ReactNode;
  routesConfig: RouteConfig;
}

export const DeFiAggregator = ({
  children,
  routesConfig,
}: IDeFiAggregatorProps): JSX.Element => {
  const {
    assets,
    networks,
    types,
    data,
    onChangeTypes,
    onChangeAssets,
    onChangeNetworks,
  } = useDeFiAggregator(routesConfig);

  return (
    <Box component="section" py={{ xs: 6, sm: 8 }}>
      <Container maxWidth="1450px">
        {children}

        <Box mb={3}>
          <Filters
            assets={assets}
            networks={networks}
            types={types}
            onChangeAsset={onChangeAssets}
            onChangeNetwork={onChangeNetworks}
            onChangeType={onChangeTypes}
          />
        </Box>

        <Table data={data} />
      </Container>
    </Box>
  );
};
