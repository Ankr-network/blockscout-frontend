import { Box, Tooltip } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { NavLink } from 'uiKit/NavLink';
import { useStakeBtnStyles } from './useStakeBtnStyles';

interface IStakeBtnProps {
  href: string;
  children?: ReactNode;
  disabled?: boolean;
  tooltip?: string;
}

export const StakeBtn = ({
  href,
  disabled,
  children,
  tooltip,
}: IStakeBtnProps) => {
  const classes = useStakeBtnStyles();

  const renderedBtn = (
    <NavLink
      className={classes.noPrimaryBtnScale}
      variant="contained"
      color="primary"
      fullWidth
      href={href}
      disabled={disabled}
    >
      {children}
    </NavLink>
  );

  return tooltip ? (
    <Tooltip open={tooltip ? undefined : false} title={tooltip ?? false} arrow>
      <Box display="inline-flex" width="100%">
        {renderedBtn}
      </Box>
    </Tooltip>
  ) : (
    renderedBtn
  );
};
