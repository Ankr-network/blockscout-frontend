import { Grid } from '@material-ui/core';
import { ReactNode } from 'react';

import { useTotalStakedStyles } from './useTotalStakedStyles';

interface ITotalIfnoContentProps {
  titleSlot?: ReactNode;
  amountSlot?: ReactNode;
  buttonSlot?: ReactNode;
}

export const TotalIfnoContent = ({
  titleSlot,
  amountSlot,
  buttonSlot,
}: ITotalIfnoContentProps): JSX.Element => {
  const classes = useTotalStakedStyles();

  return (
    <div className={classes.content}>
      {titleSlot}

      <div className={classes.contentFooter}>
        <Grid container alignItems="flex-end" spacing={1} wrap="nowrap">
          <Grid item xs>
            {amountSlot}
          </Grid>

          {buttonSlot && (
            <Grid item xs="auto">
              {buttonSlot}
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
};