import { t } from '@ankr.com/common';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { useRightsStyles } from './useRightsStyles';

const EMAIL = 'info@ankr.com';

interface IRights {
  className?: string;
}

export const Rights = ({ className = '' }: IRights): JSX.Element => {
  const classes = useRightsStyles();

  return (
    <Typography
      className={classNames(classes.root, className)}
      color="textSecondary"
      variant="subtitle1"
    >
      {t('rights.text')}

      <a
        className={classes.link}
        href={`mailto:${EMAIL}?subject=${t('rights.subject')}`}
        rel="noreferrer"
        target="_blank"
      >
        {EMAIL}
      </a>
    </Typography>
  );
};
