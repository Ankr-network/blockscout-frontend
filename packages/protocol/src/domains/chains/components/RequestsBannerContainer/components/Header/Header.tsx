import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { StatusCircle } from 'uiKit/StatusCircle';
import { Switcher } from 'modules/common/components/Switcher';
import { useHeaderStyles } from './useHeaderStyles';

interface IRequestsHeaderProps {
  total?: string;
  timeframeValue: string;
}

export const Header = ({ total, timeframeValue }: IRequestsHeaderProps) => {
  const { classes } = useHeaderStyles();

  return (
    <div className={classes.information}>
      <Typography variant="h6" component="div" className={classes.title}>
        <span className={classes.title}>{t(`requests-banner.title`)}</span>
        <Switcher value={timeframeValue} className={classes.switcher} />
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
