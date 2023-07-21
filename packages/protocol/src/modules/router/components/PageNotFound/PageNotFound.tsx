import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { Section } from './components/Section';
import { useStyles } from './PageNotFoundStyles';

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
