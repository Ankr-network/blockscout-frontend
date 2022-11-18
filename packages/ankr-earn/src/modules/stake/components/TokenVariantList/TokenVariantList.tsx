import { t } from '@ankr.com/common';
import { Box, BoxProps, Grid } from '@material-ui/core';
import { Children } from 'react';
import { uid } from 'react-uid';

import { StakeDescriptionName } from '../StakeDescriptionName';

import { useTokenVariantListStyles } from './useTokenVariantListStyles';

interface ITokenVariantListProps extends BoxProps {}

export const TokenVariantList = ({
  children,
  ...restProps
}: ITokenVariantListProps): JSX.Element => {
  const classes = useTokenVariantListStyles();

  return (
    <Box {...restProps}>
      <StakeDescriptionName className={classes.title}>
        {t('stake-ethereum.token-select-label')}
      </StakeDescriptionName>

      <Grid container spacing={2}>
        {Children.map(
          children,
          (child, index) =>
            !!child && (
              <Grid key={uid(index)} item sm={6} xs={12}>
                {child}
              </Grid>
            ),
        )}
      </Grid>
    </Box>
  );
};
