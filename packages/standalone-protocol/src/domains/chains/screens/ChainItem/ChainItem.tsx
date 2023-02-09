import { Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import { useStyles } from './ChainItemStyles';
import { IChainItemDetails } from 'domains/chains/actions/fetchChain';
import { ChainItemDetailsQuery } from './ChainItemDetailsQuery';
import { ChainNodesTableQuery } from './ChainNodesTableQuery';
import { CopyButtons } from './components/CopyButtons';
import { Header } from 'modules/common/components/Header';
import { getTheme } from 'modules/common/utils/getTheme';
import { ChainId, isStandaloneChain } from 'domains/chains/api/chain';
import { CrossMenu } from './components/CrossMenu';

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
        <CrossMenu chainId={chainId} className={classes.menu} />
        <Header chainId={chainId} />
        <CopyButtons data={data} chainId={chainId} />
        <ChainItemDetailsQuery chainId={chainId} isStandalone={isStandalone} />
        <ChainNodesTableQuery chainId={chainId} isStandalone={isStandalone} />
      </Container>
    </ThemeProvider>
  );
};