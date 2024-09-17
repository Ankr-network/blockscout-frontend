import { Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { greetingTranslation } from './translation';
import { useGreetingStyles } from './useGreetingsStyles';

export interface IGreetingProps {
  className?: string;
}

export const Greeting = ({ className }: IGreetingProps) => {
  const { classes, cx } = useGreetingStyles();
  const { keys, t } = useTranslation(greetingTranslation);

  return (
    <div className={cx(classes.root, className)}>
      <Typography className={classes.title} variant="h3">
        {t(keys.title)}
      </Typography>
      <Typography variant="body2">{t(keys.subtitle)}</Typography>
    </div>
  );
};
