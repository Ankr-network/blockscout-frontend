import { Button } from '@material-ui/core';

import { root } from '../../const';
import { t } from 'modules/i18n/utils/intl';
import { useHeaderStyles } from './HeaderStyles';

export interface HeaderProps {
  onClear?: () => void;
}

const title = t(`${root}.title`);
const clearButton = t(`${root}.clear-button`);

export const Header = ({ onClear }: HeaderProps) => {
  const classes = useHeaderStyles();

  return (
    <div className={classes.header}>
      <div className={classes.title}>{title}</div>
      <Button
        className={classes.clearButton}
        onClick={onClear}
        variant="outlined"
      >
        {clearButton}
      </Button>
    </div>
  );
};
