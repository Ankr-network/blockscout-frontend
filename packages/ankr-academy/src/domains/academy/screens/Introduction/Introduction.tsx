import React from 'react';
import { useIntroductionStyles } from './IntroductionStyles';
import { Container } from '@material-ui/core';

export const Introduction = () => {
  const classes = useIntroductionStyles();

  return (
    <Container component="section" className={classes.root}>
      <>Academy main page</>
    </Container>
  );
};
