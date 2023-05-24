import { ReactNode } from 'react';
import { root } from '../../const';
import { t } from '@ankr.com/common';
import { PremiumLabel } from '../PremiumLabel';
import { useEndpointPlaceholderStyles } from './useEndpointPlaceholderStyles';
import { Box } from '@mui/material';

interface IEndpointProps {
  title: ReactNode;
  label?: string;
  onClick?: () => void;
  labelClassName?: string;
}

export const EndpointPlaceholder = ({
  title,
  label = t(`${root}.endpoints.upgrade-now`),
  onClick,
  labelClassName,
}: IEndpointProps) => {
  const { classes } = useEndpointPlaceholderStyles();

  return (
    <div className={classes.root}>
      {title}
      <Box
        role="button"
        tabIndex={0}
        className={classes.container}
        onClick={onClick}
        sx={{
          cursor: onClick ? 'pointer' : 'auto',
        }}
      >
        <PremiumLabel label={label} className={labelClassName} />
      </Box>
    </div>
  );
};
