import { Skeleton, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useThemes } from 'uiKit/Theme/hook/useThemes';
import { Switcher } from 'modules/common/components/Switcher';
import { Timeframe } from 'domains/chains/types';
import { timeframeToLabelMap } from 'domains/chains/screens/ChainItem/components/UsageDataSection/const';

import { useStyles } from './ChainMainInfoStyles';
import { ChainMainInfoProps } from './ChainMainInfoTypes';

export const ChainMainInfo = ({
  className = '',
  description,
  isHighlighted = false,
  isLoading,
  label,
  logoSrc,
  name,
  timeframe = Timeframe.Month,
  totalRequests = '',
  hasTotalRequestsLabel = true,
}: ChainMainInfoProps) => {
  const { themes } = useThemes();

  const { classes, cx } = useStyles({ isHighlighted, themes });

  return (
    <div className={cx(classes.root, className)}>
      {logoSrc && <img className={classes.logo} src={logoSrc} alt="" />}
      <div className={classes.right}>
        <Typography
          variant="h4"
          noWrap
          className={cx(classes.title, !!label && classes.hasLabel)}
        >
          {name}
        </Typography>
        {label}
        {hasTotalRequestsLabel && (
          <div className={classes.req}>
            {isLoading ? (
              <Skeleton className={classes.skeleton} />
            ) : (
              <>
                {!!totalRequests && (
                  <>
                    {t('chains.req', {
                      value: totalRequests,
                    })}
                    <Switcher
                      value={timeframeToLabelMap[timeframe]}
                      className={classes.switcher}
                    />
                  </>
                )}
              </>
            )}
          </div>
        )}
        {description}
      </div>
    </div>
  );
};
