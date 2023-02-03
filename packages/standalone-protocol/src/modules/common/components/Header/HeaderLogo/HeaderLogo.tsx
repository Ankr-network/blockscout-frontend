import { Box } from '@material-ui/core';

import { useStyles } from './HeaderLogoStyles';
import { ReactComponent as AnkrLogo } from './assets/ankr.svg';
import { ANKR_WEBSITE_URL } from 'Routes';
import { CrossMenu } from 'domains/chains/screens/ChainItem/components/CrossMenu';
import { ChainId } from 'domains/chains/api/chain';

interface HeaderLogoProps {
  chainId: ChainId;
  hasInfo: boolean;
}

export const HeaderLogo = ({ chainId, hasInfo }: HeaderLogoProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.header}>
      <CrossMenu chainId={chainId} className={classes.menu} />
      {hasInfo && (
        <a
          className={classes.link}
          href={ANKR_WEBSITE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <AnkrLogo />
        </a>
      )}
    </Box>
  );
};
