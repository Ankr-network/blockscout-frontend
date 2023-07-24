import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { StatusCircle } from 'uiKit/StatusCircle';
import { Switcher } from 'modules/common/components/Switcher';

import { useHeaderStyles } from './useHeaderStyles';

interface IRequestsHeaderProps {
  total?: string;
  timeframeValue: string;
  hasOffset?: boolean;
}

export const Header = ({
  total,
  timeframeValue,
  hasOffset,
}: IRequestsHeaderProps) => {
  const { classes, cx } = useHeaderStyles();

  return (
    <div
      className={cx(classes.information, {
        [classes.informationOffset]: hasOffset,
      })}
    >
      <Typography variant="h6" component="div" className={classes.title}>
        <span className={classes.title}>{t(`requests-banner.title`)}</span>
        <Switcher value={timeframeValue} />
      </Typography>

      {total && (
        <div className={classes.infoTitle}>
          <div className={classes.sectionTitle}>
            <StatusCircle size="md" />
            <Typography className={classes.text}>
              {t(`requests-banner.total-request`)}
            </Typography>
            <Typography className={classes.info}>
              {t(`requests-banner.value`, {
                value: total,
              })}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};
