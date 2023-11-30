import React, { useCallback } from 'react';

export function useMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLButtonElement>(
    null,
  );
  const open = Boolean(anchorEl);
  const handleOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleClose = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement>) => {
      event?.stopPropagation();
      setAnchorEl(null);
    },
    [],
  );

  return { open, anchorEl, handleOpen, handleClose };
}
