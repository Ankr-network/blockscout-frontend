import { Box, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

import { t } from 'common';

import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { Button } from 'uiKit/Button';
import { Container } from 'uiKit/Container';
import { NavLink } from 'uiKit/NavLink';

import { usePageNotFoundStyles } from './usePageNotFoundStyles';

export const PageNotFound = (): JSX.Element => {
  const classes = usePageNotFoundStyles();
  const { goBack } = useHistory();

  return (
    <Box className={classes.root} component="section">
      <Container>
        <Paper className={classes.box}>
          <Typography className={classes.title} variant="h1">
            404
          </Typography>

          <Typography variant="h4">{t('not-found.title')}</Typography>

          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            mt={5}
            mx={-2}
          >
            <Box mt={2} px={2}>
              <NavLink
                className={classes.button}
                color="primary"
                href={DashboardRoutes.dashboard.generatePath()}
                variant="contained"
              >
                {t('not-found.btn-home')}
              </NavLink>
            </Box>

            <Box mt={2} px={2}>
              <Button
                className={classes.button}
                color="primary"
                variant="outlined"
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
