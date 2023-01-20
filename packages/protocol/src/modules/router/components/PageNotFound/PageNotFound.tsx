import React from 'react';
import { Box, Container, Typography } from '@mui/material';

import { Section } from './components/Section';
import { useStyles } from './PageNotFoundStyles';
import { t } from '@ankr.com/common';

export const PageNotFound = () => {
  const { classes } = useStyles();

  return (
    <Section component="section" className={classes.root}>
      <Container>
        <Box textAlign="center">
          <Typography variant="h1" className={classes.title}>
            {t('common.404')}
          </Typography>

          <Typography variant="h4" className={classes.notFound}>
            {t('common.page-not-found')}
          </Typography>
        </Box>
      </Container>
    </Section>
  );
};
