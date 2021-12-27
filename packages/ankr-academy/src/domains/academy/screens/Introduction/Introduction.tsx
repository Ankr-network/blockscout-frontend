import React from 'react';
import { Link } from 'react-router-dom';
import { useIntroductionStyles as useStyles } from './IntroductionStyles';
import { Box, Button, Container, Typography } from '@material-ui/core';

export const Introduction = () => {
  const classes = useStyles();

  return (
    <Container component="section" className={classes.root}>
      <Box
        textAlign="center"
        maxWidth={800}
        paddingTop="10vh"
        alignSelf="center"
        margin="auto"
      >
        <Typography variant="h1" color="primary">
          Intro to Web3
        </Typography>
        <Typography variant="h3" gutterBottom>
          DeFi, the Metaverse, NFTs, these are all part of the bigger picture
          which is Web3
        </Typography>
        <Button color="secondary" component={Link} to="/library">
          Start Learning at Ankr Academy!
        </Button>
      </Box>
    </Container>
  );
};
