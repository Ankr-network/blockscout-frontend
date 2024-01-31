import { Typography } from '@mui/material';
import { useMemo } from 'react';

import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';

import { maskAddress } from './utils/maskAddress';
import { useAddressStyles } from './useAddressStyles';

export interface AddressProps {
  value: string;
}

export const Address = ({ value }: AddressProps) => {
  const { address, isMasked } = useMemo(() => maskAddress(value), [value]);

  const { classes } = useAddressStyles();

  const content = (
    <Typography className={classes.root} variant="body3">
      {address}
    </Typography>
  );

  if (isMasked) {
    return (
      <TooltipWrapper tooltipText={value} hasIcon={false}>
        {content}
      </TooltipWrapper>
    );
  }

  return content;
};
