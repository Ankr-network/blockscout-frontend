import { Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { useTableWidgetStyles } from '../../../utils/TableWidgetStyles';

interface HeadingTitlesProps {
  headingTitles: string[] | JSX.Element[];
  hidden: boolean;
}

export const HeadingTitles = ({
  headingTitles,
  hidden,
}: HeadingTitlesProps): JSX.Element => {
  const { cx, classes } = useTableWidgetStyles();

  return (
    <div
      className={cx(classes.row, classes.rowHeader, {
        [classes.isHidden]: hidden,
      })}
    >
      {headingTitles.map((headingTitle, idx) => {
        const isElement = React.isValidElement(headingTitle);

        if (isElement) {
          return <Fragment key={idx}>headingTitle</Fragment>;
        }

        return (
          <Typography key={idx} variant="caption">
            {headingTitle}
          </Typography>
        );
      })}
    </div>
  );
};
