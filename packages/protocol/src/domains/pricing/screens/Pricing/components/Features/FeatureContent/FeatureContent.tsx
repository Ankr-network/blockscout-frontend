import { Button, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { Check, Minus, Plus } from '@ankr.com/ui';
import { useCallback } from 'react';

import { Collapse } from 'uiKit/Collapse';
import { SALES_TEAM_CONTACT } from 'modules/common/constants/const';

import { useFeatureContentStyles } from './useFeatureContentStyles';
import {
  INTL_PLAN_COMPARISON_ROOT,
  COLUMNS_HELPER,
  PLAN_COMPARISON,
  SUB_ROW_NUMBERS,
  FIRST_ROWS_INDEXES,
  SECOND_ROWS_INDEXES,
  getPlanLabelByName,
  TPlan,
  PLAN_COLUMNS,
  THIRD_ROWS_INDEXES,
  ROWS_COUNT,
} from '../FeatureTable/FeatureTableUtils';
import { PlanLabel } from '../../PlanLabel';
import { EPlan } from '../../Plans/PlansUtils';
import { ActionButton } from '../../Plans/components/ActionButton';

interface IFeatureContentProps {
  name: string;
  itemIndex: number;
  className?: string;
}

interface IFeatureItemProps {
  index: number;
  rowIndex: number;
  buttonClassname?: string;
}

export const FeatureItem = ({
  buttonClassname,
  index,
  rowIndex,
}: IFeatureItemProps) => {
  const { classes, cx } = useFeatureContentStyles();

  const item = COLUMNS_HELPER[index];
  const name = PLAN_COMPARISON[index];

  if (item?.supported?.includes(rowIndex)) {
    return <Check className={classes.check} />;
  }

  if (item?.emptyCell?.includes(rowIndex)) {
    return ' ';
  }

  if (item?.button?.includes(rowIndex)) {
    const planName = PLAN_COLUMNS[index];

    if (planName !== EPlan.Enterprise) {
      return (
        <ActionButton
          isCurrentShortText
          className={cx(classes.button, buttonClassname)}
          planName={planName}
        />
      );
    }

    return (
      <Button
        target="_blank"
        variant="outlined"
        href={SALES_TEAM_CONTACT}
        className={cx(classes.button, buttonClassname)}
      >
        {t(`${INTL_PLAN_COMPARISON_ROOT}.contact-sales`)}
      </Button>
    );
  }

  return (
    <Typography variant="body2" className={classes.value}>
      {t(`${INTL_PLAN_COMPARISON_ROOT}.${name}.text-${rowIndex}`)}
    </Typography>
  );
};

export const FeatureContent = ({
  className,
  itemIndex,
  name,
}: IFeatureContentProps) => {
  const { classes, cx } = useFeatureContentStyles();

  const renderRows = useCallback(
    (rows: number[]) => {
      return rows.map(rowIndex => {
        const isRowSubtitle = SUB_ROW_NUMBERS.includes(rowIndex);
        const isLastRow = rowIndex === ROWS_COUNT;

        if (isLastRow) {
          return (
            <div key={`column-${rowIndex}`} className={classes.fullRow}>
              {FeatureItem({
                index: itemIndex,
                rowIndex,
                buttonClassname: classes.fullWidthButton,
              })}
            </div>
          );
        }

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
            <div className={classes.valueWrapper}>
              {FeatureItem({
                index: itemIndex,
                rowIndex,
              })}
            </div>
          </div>
        );
      });
    },
    [classes, itemIndex, cx],
  );

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="subtitle2" className={name}>
          {t(`${INTL_PLAN_COMPARISON_ROOT}.${name}.title`)}
        </Typography>
        <PlanLabel plan={getPlanLabelByName(name as TPlan)} />
      </div>
      <Collapse
        className={cx(classes.collapse, className)}
        collapsedIcon={
          <Plus className={cx(classes.icon, classes.collapseIcon)} />
        }
        uncollapsedIcon={<Minus className={classes.icon} />}
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
            <Typography
              variant="subtitle1"
              component="p"
              className={classes.sectionTitle}
            >
              {t(`${INTL_PLAN_COMPARISON_ROOT}.pricing`)}
            </Typography>
            {renderRows(THIRD_ROWS_INDEXES)}
          </>
        }
      />
    </div>
  );
};
