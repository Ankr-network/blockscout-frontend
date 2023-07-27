import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

import { root } from '../../const';
import { useHeaderStyles } from './HeaderStyles';

export interface HeaderProps {
  onClear?: () => void;
}

export const Header = ({ onClear }: HeaderProps) => {
  const { classes } = useHeaderStyles();

  return (
    <div className={classes.header}>
      <div className={classes.title}>{t(`${root}.title`)}</div>
      <Button
        className={classes.clearButton}
        onClick={onClear}
        variant="outlined"
      >
        {t(`${root}.clear-button`)}
      </Button>
    </div>
  );
};
