import { useCallback, useMemo, useState } from 'react';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useCollapsingStringStyles } from './useCollapsingStringStyles';

interface CollapsingStringProps {
  text: string;
  maxLength?: number;
}

const DEFAULT_MAX_LENGTH = 60;

export const CollapsingString = ({
  maxLength = DEFAULT_MAX_LENGTH,
  text,
}: CollapsingStringProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const { classes, cx } = useCollapsingStringStyles();

  const isCollapsingEnabled = text.length >= maxLength;

  const showContent = useCallback(() => setIsCollapsed(false), []);
  const hideContent = useCallback(() => setIsCollapsed(true), []);

  const visibleText = useMemo(() => {
    if (isCollapsingEnabled && isCollapsed) {
      return `${text.substring(0, maxLength)}...`;
    }

    return text;
  }, [isCollapsed, isCollapsingEnabled, maxLength, text]);

  return (
    <div
      className={cx(classes.root, {
        [classes.rootOpened]: isCollapsingEnabled && !isCollapsed,
      })}
    >
      <div
        className={cx(classes.wrapper, {
          [classes.wrapperCollapsed]: isCollapsingEnabled,
        })}
      >
        <Typography
          className={classes.text}
          noWrap={isCollapsed}
          variant="caption"
          color="textSecondary"
        >
          {visibleText}
        </Typography>
      </div>

      {isCollapsingEnabled && (
        <>
          {isCollapsed ? (
            <Typography
              className={cx(classes.btn, classes.btnMore)}
              color="primary"
              variant="caption"
              role="button"
              onClick={showContent}
            >
              {t('common.show-more')}
            </Typography>
          ) : (
            <Typography
              className={classes.btn}
              color="primary"
              variant="caption"
              role="button"
              onClick={hideContent}
            >
              {t('common.show-less')}
            </Typography>
          )}
        </>
      )}
    </div>
  );
};
