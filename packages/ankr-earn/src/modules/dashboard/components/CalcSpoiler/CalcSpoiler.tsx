import classNames from 'classnames';
import { CSSProperties, ReactNode, useRef, useState } from 'react';

import { t } from 'common';

import { Button } from 'uiKit/Button';
import { AngleDownIcon } from 'uiKit/Icons/AngleDownIcon';

import { useCalcSpoilerStyles } from './useCalcSpoilerStyles';

interface ICalcSpoilerProps {
  children?: ReactNode;
}

export const CalcSpoiler = ({ children }: ICalcSpoilerProps): JSX.Element => {
  const classes = useCalcSpoilerStyles();
  const [expanded, setExpanded] = useState(false);
  const bodyContentRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setExpanded(prev => !prev);
  };

  const bodyStyle: CSSProperties = {
    height: expanded ? bodyContentRef.current?.offsetHeight : undefined,
  };

  return (
    <>
      <div className={classes.header}>
        <div className={classes.buttonWrapper}>
          <Button
            fullWidth
            classes={{ iconSizeLarge: classes.buttonIcon }}
            endIcon={<AngleDownIcon />}
            size="large"
            variant="outlined"
            onClick={handleClick}
          >
            {t('dashboard.empty.calc-btn')}
          </Button>
        </div>
      </div>

      <div
        className={classNames(
          classes.bodyWrapper,
          expanded && classes.bodyWrapperActive,
        )}
        style={bodyStyle}
      >
        <div
          ref={bodyContentRef}
          className={classNames(classes.body, expanded && classes.bodyActive)}
        >
          {children}
        </div>
      </div>
    </>
  );
};
