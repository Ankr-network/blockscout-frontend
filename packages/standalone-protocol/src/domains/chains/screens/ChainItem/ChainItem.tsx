import React from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import { useStyles } from './ChainItemStyles';
import { IChainItemDetails } from 'domains/chains/actions/fetchChain';
import { ChainItemDetailsQuery } from './ChainItemDetailsQuery';
import { ChainNodesTableQuery } from './ChainNodesTableQuery';
import { CopyButtons } from './components/CopyButtons';
import { ChainHeader } from './components/ChainHeader';
import { Info } from './components/Info';
import { getTheme } from 'modules/common/utils/getTheme';
import { ChainId, isStandaloneChain } from 'domains/chains/api/chain';
import { CrossMenu } from './components/CrossMenu';
import { StandaloneChainNodesTableQuery } from './StandaloneChainNodesTableQuery';

interface IChainItemUIProps {
  data?: IChainItemDetails;
  chainId: ChainId;
}

export const ChainItem = ({ data, chainId }: IChainItemUIProps) => {
  const classes = useStyles();

  const isStandalone = isStandaloneChain(chainId);

  return (
    <ThemeProvider theme={getTheme(chainId)}>
      <Container className={classes.main}>
        <CrossMenu chainId={chainId} />
        <ChainHeader className={classes.header} chainId={chainId} />
        <CopyButtons data={data} chainId={chainId} />
        <Info chainId={chainId} />
        {!isStandalone && <ChainItemDetailsQuery chainId={chainId} />}
        {isStandalone ? (
          <StandaloneChainNodesTableQuery chainId={chainId} />
        ) : (
          <ChainNodesTableQuery chainId={chainId} />
        )}
      </Container>
    </ThemeProvider>
  );
};
