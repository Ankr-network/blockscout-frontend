import React from 'react';
import { Typography } from '@mui/material';
import { useTableWidgetStyles } from '../../../utils/TableWidgetStyles';

interface DataTableItemProps {
  value: string | JSX.Element;
  longText?: boolean;
}

export const DataTableItem = ({ value, longText }: DataTableItemProps) => {
  const { classes } = useTableWidgetStyles();

  const isElement = React.isValidElement(value);

  if (isElement) {
    return value;
  }

  return (
    <Typography
      className={longText ? classes.longText : undefined}
      variant="caption"
    >
      {value}
    </Typography>
  );
};
