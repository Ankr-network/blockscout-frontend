import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';

import { useStyles } from './PageNotFoundStyles';

export const PageNotFound = () => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <Container>
        <Box textAlign="center">
          <Typography variant="h1" className={classes.title}>
            404
          </Typography>

          <Typography variant="h4">Page not found</Typography>
        </Box>
      </Container>
    </section>
  );
};
