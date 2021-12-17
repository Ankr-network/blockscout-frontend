import { Container, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { Button } from 'uiKit/Button';
import { useConnectStyles } from './useConnectStyles';

interface IConnectProps {
  onConnectClick?: () => void;
}

// todo: make component according to the design
export const Connect = ({ onConnectClick }: IConnectProps) => {
  const classes = useConnectStyles();

  return (
    <Container>
      <Paper className={classes.box}>
        <Typography variant="h3" className={classes.title}>
          Connect wallet to continue
        </Typography>

        <Typography variant="body1" className={classes.networkText}>
          Required network: 👉 Ethereum Mainnet
        </Typography>

        <Button onClick={onConnectClick}>Connect</Button>
      </Paper>
    </Container>
  );
};
