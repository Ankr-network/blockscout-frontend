import { Button } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { maxButtonTranslation } from './translation';
import { useMaxButtonStyles } from './useMaxButtonStyles';

export interface IMaxButtonProps {
  onClick: () => void;
}

export const MaxButton = ({ onClick }: IMaxButtonProps) => {
  const { classes } = useMaxButtonStyles();
  const { keys, t } = useTranslation(maxButtonTranslation);

  return (
    <Button
      className={classes.root}
      color="secondary"
      onClick={onClick}
      size="extraSmall"
      variant="contained"
    >
      {t(keys.label)}
    </Button>
  );
};
