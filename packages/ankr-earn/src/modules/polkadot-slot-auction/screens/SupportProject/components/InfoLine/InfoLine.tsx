import * as React from 'react';
import { useInfoLineStyles } from './useInfoLineStyles';

interface InfoLineProps {
  title: string;
  value: string | number;
}
export const InfoLine = ({ title, value }: InfoLineProps) => {
  const classes = useInfoLineStyles();

  return (
    <div className={classes.line}>
      <div className={classes.infoText}>
        <span>{title}</span>
      </div>
      <div className={classes.infoValue}>{value}</div>
    </div>
  );
};
