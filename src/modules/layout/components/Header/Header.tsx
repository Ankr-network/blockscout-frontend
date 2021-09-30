import React from 'react';
import { Container } from '@material-ui/core';

import { useStyles } from './HeaderStyles';

export const Header = () => {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <Container className={classes.container} maxWidth={false}>
        Header
      </Container>
    </header>
  );
};
