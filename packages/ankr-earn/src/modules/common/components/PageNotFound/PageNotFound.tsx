import { Box, Paper, Typography } from '@material-ui/core';
import { isMainnet } from 'modules/common/const';
import { EParachainPolkadotNetwork } from 'modules/common/types';
import { t } from 'modules/i18n/utils/intl';
import { RoutesConfig as PolkadotSlotAuctionRoutes } from 'modules/polkadot-slot-auction/Routes';
import React from 'react';
import { useHistory } from 'react-router';
import { Button } from 'uiKit/Button';
import { Container } from 'uiKit/Container';
import { NavLink } from 'uiKit/NavLink';
import { usePageNotFoundStyles } from './usePageNotFoundStyles';

interface IPageNotFoundProps {}

/**
 *  TODO Please add fixes for routes after the release
 */
export const PageNotFound = (props: IPageNotFoundProps) => {
  const classes = usePageNotFoundStyles();
  const { goBack } = useHistory();

  return (
    <Box component="section" className={classes.root}>
      <Container>
        <Paper className={classes.box}>
          <Typography variant="h1" className={classes.title}>
            404
          </Typography>

          <Typography variant="h4">{t('not-found.title')}</Typography>

          <Box
            display="flex"
            flexWrap="wrap"
            mx={-2}
            mt={5}
            justifyContent="center"
          >
            <Box px={2} mt={2}>
              <NavLink
                className={classes.button}
                variant="contained"
                color="primary"
                href={PolkadotSlotAuctionRoutes.crowdloans.generatePath(
                  isMainnet
                    ? EParachainPolkadotNetwork.DOT.toLowerCase()
                    : EParachainPolkadotNetwork.WND.toLowerCase(),
                )}
              >
                {t('not-found.btn-home')}
              </NavLink>
            </Box>

            <Box px={2} mt={2}>
              <Button
                className={classes.button}
                variant="outlined"
                color="primary"
                onClick={goBack}
              >
                {t('not-found.btn-back')}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
