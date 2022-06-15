import { Box, Grid } from '@material-ui/core';

import { t } from 'common';

import { BigNav } from 'modules/common/components/BigNav';
import { BigNavItem } from 'modules/common/components/BigNavItem';
import { RoutesConfig } from 'modules/stake-ankr/Routes';
import { AnkrIcon } from 'uiKit/Icons/AnkrIcon';

import { AnkrBalance } from '../AnkrBalance';

import { useHeader } from './useHeader';
import { useHeaderStyles } from './useHeaderStyles';

export const Header = (): JSX.Element => {
  const classes = useHeaderStyles();
  const { balance, getTokensLink } = useHeader();

  return (
    <Box mb={3}>
      <Grid container alignItems="center" spacing={3}>
        <Grid item lg xs={12}>
          <BigNav>
            <BigNavItem href={RoutesConfig.main.generatePath()}>
              {t('stake-ankr.header.my')}

              <AnkrIcon className={classes.icon} />

              {t('stake-ankr.header.staking')}
            </BigNavItem>

            <BigNavItem href={RoutesConfig.providers.generatePath()}>
              {t('stake-ankr.header.node-providers')}
            </BigNavItem>
          </BigNav>
        </Grid>

        <Grid item lg="auto" xs={12}>
          <AnkrBalance link={getTokensLink} value={balance} />
        </Grid>
      </Grid>
    </Box>
  );
};
