import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useGlossaryItemStyles } from './GlossaryItemStyles';

interface IGlossaryItemProps {
  href: string;
  termTitle: string;
  value: string;
  id?: string;
}

export const GlossaryItem = ({
  href,
  termTitle,
  value,
  id,
}: IGlossaryItemProps) => {
  const classes = useGlossaryItemStyles();

  return (
    <Link to={href} id={id}>
      <br />
      <Paper>
        <Typography className={classes.title} variant="h4">
          {termTitle}
        </Typography>
        <Typography className={classes.value} variant="body1">
          {value}
        </Typography>
      </Paper>
    </Link>
  );
};
