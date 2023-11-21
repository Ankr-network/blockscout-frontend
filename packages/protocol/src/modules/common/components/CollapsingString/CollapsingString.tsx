import { useCallback, useMemo, useRef, useState } from 'react';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useCollapsingStringStyles } from './useCollapsingStringStyles';

interface CollapsingStringProps {
  text: string;
  maxWidth?: number;
}

export const CollapsingString = ({
  text,
  maxWidth = 400,
}: CollapsingStringProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const stringRef = useRef<HTMLSpanElement>(null);

  const isCollapsingEnabled = useMemo(() => {
    const stringWidth = stringRef.current ? stringRef.current.offsetWidth : 0;

    return stringWidth >= maxWidth;
    // stringRef.current is necessary to be added to dependencies in order to calculate item width after render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxWidth, stringRef.current]);

  const { classes, cx } = useCollapsingStringStyles({ maxWidth });

  const showContent = useCallback(() => setIsCollapsed(false), []);
  const hideContent = useCallback(() => setIsCollapsed(true), []);

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
          ref={stringRef}
        >
          {text}
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
