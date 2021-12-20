import { Box, Container, Paper, Typography } from '@material-ui/core';
import { INDEX_PATH } from 'modules/common/const';
import { t } from 'modules/i18n/utils/intl';
import React from 'react';
import { useHistory } from 'react-router';
import { Button } from 'uiKit/Button';
import { NavLink } from 'uiKit/NavLink';
import { usePageNotFoundStyles } from './usePageNotFoundStyles';

interface IPageNotFoundProps {}

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
                href={INDEX_PATH}
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
