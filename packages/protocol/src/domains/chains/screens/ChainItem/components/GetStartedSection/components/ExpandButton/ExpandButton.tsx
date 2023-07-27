import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

import { useStyles } from './ExpandButtonStyles';
import { root } from '../../const';

export interface ExpandButtonProps {
  className?: string;
  isVisible?: boolean;
  onClick: () => void;
}

export const ExpandButton = ({
  className = '',
  isVisible = true,
  onClick,
}: ExpandButtonProps) => {
  const { classes, cx } = useStyles();

  return isVisible ? (
    <Button
      className={cx(className, classes.expandButton)}
      onClick={onClick}
      variant="outlined"
    >
      {t(`${root}.connection-snippet.expand-button.label`)}
    </Button>
  ) : null;
};
