import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';

import { Section } from 'uiKit/Section';
import { useStyles } from './PageNotFoundStyles';

export const PageNotFound = () => {
  const classes = useStyles();

  return (
    <Section component="section" className={classes.root}>
      <Container>
        <Box textAlign="center">
          <Typography variant="h1" className={classes.title}>
            404
          </Typography>

          <Typography variant="h4">Page not found</Typography>
        </Box>
      </Container>
    </Section>
  );
};
