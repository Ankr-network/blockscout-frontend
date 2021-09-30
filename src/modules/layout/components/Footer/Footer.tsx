import React from 'react';
import { Container, Grid } from '@material-ui/core';

import { useFooterStyles } from './FooterStyles';

export const Footer = () => {
  const classes = useFooterStyles();

  return (
    <footer className={classes.root}>
      <Container maxWidth={false} className={classes.container}>
        <Grid container spacing={1} justify="center">
          <Grid item xs={12} sm={12} md={12} lg={5}>
            Footer
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};
