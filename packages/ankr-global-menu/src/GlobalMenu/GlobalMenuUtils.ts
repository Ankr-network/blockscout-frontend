const POPOVER_OFFSET_TOP = 28;

export interface IGlobalMenuPopoverPosition {
  left: number;
  top: number;
}

export const getPopoverPosition = (
  anchorEl: HTMLButtonElement | null,
): IGlobalMenuPopoverPosition => {
  const anchorElRect = anchorEl?.getBoundingClientRect();

  return {
    top: (anchorElRect?.bottom || 0) + POPOVER_OFFSET_TOP,
    left: anchorElRect?.left || 0,
  };
};
