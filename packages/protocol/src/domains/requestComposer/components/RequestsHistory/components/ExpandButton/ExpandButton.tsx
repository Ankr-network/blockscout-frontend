import { ArrowDown } from '@ankr.com/ui';
import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

import { useExpandButtonStyles } from './ExpandButtonStyles';
import { intlRoot } from '../../const';

export interface ExpandButtonProps {
  onClick: () => void;
}

export const ExpandButton = ({ onClick }: ExpandButtonProps) => {
  const { classes } = useExpandButtonStyles();

  return (
    <Button
      className={classes.root}
      endIcon={<ArrowDown />}
      onClick={onClick}
      variant="outlined"
    >
      {t(`${intlRoot}.expand-button`)}
    </Button>
  );
};
