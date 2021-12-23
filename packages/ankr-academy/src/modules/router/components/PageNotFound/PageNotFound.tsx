import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';

import { t } from '../../../i18n/utils/intl';
import { useStyles } from './PageNotFoundStyles';

export const PageNotFound = () => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <Container>
        <Box textAlign="center">
          <Typography variant="h1" className={classes.title}>
            {t('page-not-found.title')}
          </Typography>

          <Typography variant="h4">{t('page-not-found.text')}</Typography>
        </Box>
      </Container>
    </section>
  );
};
