import { Container, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import { tHTML } from 'modules/i18n/utils/intl';
import classNames from 'classnames';
import { useStyles } from './ChainItemStyles';
import { IChainItemDetails } from 'domains/chains/actions/fetchChain';
import { ChainItemDetailsQuery } from './ChainItemDetailsQuery';
import { ChainNodesTableQuery } from './ChainNodesTableQuery';
import { CopyButtons } from './components/CopyButtons';
import { Header } from 'modules/common/components/Header';
import { getTheme } from 'modules/common/utils/getTheme';
import {
  ChainId,
  isStandaloneChain,
  MAP_CHAIN_ID_TO_NODE_DETAILS_ID,
  MAP_CHAIN_ID_TO_DETAILS_ID,
} from 'domains/chains/api/chain';
import { CrossMenu } from './components/CrossMenu';

interface IChainItemUIProps {
  data?: IChainItemDetails;
  chainId: ChainId;
}

export const ChainItem = ({ data, chainId }: IChainItemUIProps) => {
  const classes = useStyles();

  const isStandalone = isStandaloneChain(chainId);

  const isComingSoon = Boolean(data?.chain?.isComingSoon);
  const isPolygon = chainId === ChainId.Polygon;

  return (
    <ThemeProvider theme={getTheme(chainId)}>
      <div className={classNames(classes.container, chainId)}>
        <Container className={classes.main}>
          <CrossMenu chainId={chainId} className={classes.menu} />
          <Header chainId={chainId} />
          <CopyButtons
            isComingSoon={isComingSoon}
            data={data}
            chainId={chainId}
          />
          {isPolygon && (
            <Typography className={classes.zkEvmText} variant="body2">
              {tHTML('chain-item.polygon-zk-evm.description')}
            </Typography>
          )}
          <ChainItemDetailsQuery
            isComingSoon={isComingSoon}
            chainId={MAP_CHAIN_ID_TO_DETAILS_ID[chainId] || chainId}
            isStandalone={isStandalone}
          />
          <ChainNodesTableQuery
            isComingSoon={isComingSoon}
            chainId={MAP_CHAIN_ID_TO_NODE_DETAILS_ID[chainId] || chainId}
            isStandalone={isStandalone}
          />
        </Container>
      </div>
    </ThemeProvider>
  );
};
