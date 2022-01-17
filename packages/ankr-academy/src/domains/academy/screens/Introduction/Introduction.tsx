import React from 'react';
import { Link } from 'react-router-dom';
import { useIntroductionStyles as useStyles } from './IntroductionStyles';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { LibraryRoutesConfig } from 'domains/library/LibraryRouterConfig';

export const Introduction = () => {
  const classes = useStyles();

  return (
    <Container component="section" className={classes.root}>
      <Box textAlign="center" maxWidth={800} alignSelf="center" margin="auto">
        <Typography variant="h1" color="primary">
          Intro to Web3
        </Typography>
        <Typography variant="h3" gutterBottom>
          DeFi, the Metaverse, NFTs, these are all part of the bigger picture
          which is Web3
        </Typography>
        <Button
          color="secondary"
          component={Link}
          to={LibraryRoutesConfig.lesson.generatePath('lesson1')}
        >
          Start Learning at Ankr Academy!
        </Button>
      </Box>
    </Container>
  );
};
