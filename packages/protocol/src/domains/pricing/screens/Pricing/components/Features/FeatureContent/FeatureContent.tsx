import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { ArrowDown, Check } from '@ankr.com/ui';
import { useCallback } from 'react';

import { Collapse } from 'uiKit/Collapse';

import { useFeatureContentStyles } from './useFeatureContentStyles';
import {
  INTL_PLAN_COMPARISON_ROOT,
  COLUMNS_HELPER,
  PLAN_COMPARISON,
  SUB_ROW_NUMBERS,
  FIRST_ROWS_INDEXES,
  SECOND_ROWS_INDEXES,
} from '../FeatureTable/FeatureTableUtils';

interface IFeatureContentProps {
  name: string;
  itemIndex: number;
}

interface IFeatureItemProps {
  index: number;
  rowIndex: number;
}

export const FeatureItem = ({ index, rowIndex }: IFeatureItemProps) => {
  const { classes } = useFeatureContentStyles();

  const item = COLUMNS_HELPER[index];
  const name = PLAN_COMPARISON[index];

  if (item?.supported?.includes(rowIndex)) {
    return <Check className={classes.check} />;
  }

  if (item?.emptyCell?.includes(rowIndex)) {
    return null;
  }

  return (
    <Typography variant="body2">
      {t(`${INTL_PLAN_COMPARISON_ROOT}.${name}.text-${rowIndex}`)}
    </Typography>
  );
};

export const FeatureContent = ({ itemIndex, name }: IFeatureContentProps) => {
  const { classes, cx } = useFeatureContentStyles();

  const renderRows = useCallback(
    (rows: number[]) => {
      return rows.map(rowIndex => {
        const isRowSubtitle = SUB_ROW_NUMBERS.includes(rowIndex);

        return (
          <div key={`column-${rowIndex}`} className={classes.row}>
            <Typography
              variant={isRowSubtitle ? 'subtitle3' : 'subtitle2'}
              className={cx(
                classes.subtitle,
                isRowSubtitle && classes.rowSubtitle,
              )}
            >
              {t(`${INTL_PLAN_COMPARISON_ROOT}.name-${rowIndex}`)}
            </Typography>
            {FeatureItem({
              index: itemIndex,
              rowIndex,
            })}
          </div>
        );
      });
    },
    [classes, itemIndex, cx],
  );

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
        content={
          <>
            <Typography
              variant="subtitle1"
              component="p"
              className={classes.sectionTitle}
            >
              {t(`${INTL_PLAN_COMPARISON_ROOT}.features`)}
            </Typography>
            {renderRows(FIRST_ROWS_INDEXES)}
            <Typography
              variant="subtitle1"
              component="p"
              className={classes.sectionTitle}
            >
              {t(`${INTL_PLAN_COMPARISON_ROOT}.products`)}
            </Typography>
            {renderRows(SECOND_ROWS_INDEXES)}
          </>
        }
      />
    </div>
  );
};
