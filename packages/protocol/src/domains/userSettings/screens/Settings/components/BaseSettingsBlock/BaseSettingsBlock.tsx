import { Paper, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { useBaseSettingsBlockStyles } from './useBaseSettingsBlockStyles';

interface IBaseSettingsBlockProps {
  title: string;
  children: ReactNode;
}

export const BaseSettingsBlock = ({
  children,
  title,
}: IBaseSettingsBlockProps) => {
  const { classes } = useBaseSettingsBlockStyles();

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" component="p" className={classes.title}>
        {title}
      </Typography>

      <Paper className={classes.content}>{children}</Paper>
    </div>
  );
};
