import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { ArrowDown, Check, Cross } from '@ankr.com/ui';

import { Collapse } from 'uiKit/Collapse';
import { SoonLabel } from 'modules/common/components/SoonLabel';

import { useFeatureContentStyles } from './useFeatureContentStyles';
import {
  INTL_PLAN_COMPARISON_ROOT,
  COLUMNS_HELPER,
  PLAN_COMPARISON,
  COLUMNS_COUNT,
} from '../FeatureTable/FeatureTableUtils';

interface IFeatureContentProps {
  name: string;
  itemIndex: number;
}

interface IFeatureItemProps {
  index: number;
  rowIndex: number;
  isMobile?: boolean;
}

export const FeatureItem = ({
  index,
  rowIndex,
  isMobile,
}: IFeatureItemProps) => {
  const { classes } = useFeatureContentStyles();

  const item = COLUMNS_HELPER[index];
  const name = PLAN_COMPARISON[index];

  if (item?.supported?.includes(rowIndex)) {
    return <Check className={classes.check} />;
  }

  if (item?.unsupported?.includes(rowIndex)) {
    return <Cross className={classes.cross} />;
  }

  if (item?.comingSoon?.includes(rowIndex)) {
    return (
      <SoonLabel className={isMobile ? classes.mobileSoon : classes.soon} />
    );
  }

  return (
    <Typography variant="body2">
      {t(`${INTL_PLAN_COMPARISON_ROOT}.${name}.text-${rowIndex}`)}
    </Typography>
  );
};

export const FeatureContent = ({ name, itemIndex }: IFeatureContentProps) => {
  const { classes, cx } = useFeatureContentStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="subtitle1" className={name}>
          {t(`${INTL_PLAN_COMPARISON_ROOT}.${name}.title`)}
        </Typography>
        <Typography variant="body2" className={classes.summary}>
          {t(`${INTL_PLAN_COMPARISON_ROOT}.${name}.summary`)}
        </Typography>
      </div>
      <Collapse
        className={classes.collapse}
        collapsedIcon={<ArrowDown className={classes.icon} />}
        uncollapsedIcon={
          <ArrowDown className={cx(classes.icon, classes.unCollapseIcon)} />
        }
        content={new Array(COLUMNS_COUNT).fill('').map((_, index) => (
          <div key={`column-${index + 1}`} className={classes.row}>
            <Typography variant="subtitle1" className={classes.subtitle}>
              {t(`${INTL_PLAN_COMPARISON_ROOT}.name-${index + 1}`)}
            </Typography>
            {FeatureItem({
              index: itemIndex,
              rowIndex: index + 1,
              isMobile: true,
            })}
          </div>
        ))}
      />
    </div>
  );
};
