import { Box } from '@material-ui/core';
import { ReactNode } from 'react';

import { NavLink } from 'uiKit/NavLink';
import { Tooltip } from 'uiKit/Tooltip';

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
}: IStakeBtnProps): JSX.Element => {
  const classes = useStakeBtnStyles();

  const renderedBtn = (
    <NavLink
      fullWidth
      className={classes.noPrimaryBtnScale}
      color="primary"
      disabled={disabled}
      href={href}
      variant="contained"
    >
      {children}
    </NavLink>
  );

  return tooltip ? (
    <Tooltip arrow open={tooltip ? undefined : false} title={tooltip ?? false}>
      <Box display="inline-flex" width="100%">
        {renderedBtn}
      </Box>
    </Tooltip>
  ) : (
    renderedBtn
  );
};
