import { t } from '@ankr.com/common';

import { useDialog } from 'modules/common/hooks/useDialog';

import { EditPlanDialog } from '../EditPlanDialog';
import { NextBillingDate } from '../NextBillingDate';
import { Price } from '../Price';
import { Progress } from './components/Progress';
import { Widget } from '../Widget';
import { WidgetTitle } from '../WidgetTitle';
import { intlRoot } from './const';
import { usePlanWidget } from './hooks/usePlanWidget';
import { usePlanWidgetStyles } from './PlanWidgetStyles';

export interface PlanWidgetProps {
  className: string;
}

export const PlanWidget = ({ className }: PlanWidgetProps) => {
  const { amount, endDate, period, requestsUsed } = usePlanWidget();
  const { isOpened, onClose, onOpen } = useDialog();

  const { classes } = usePlanWidgetStyles();

  return (
    <Widget className={className} hasEditButton onEdit={onOpen}>
      <WidgetTitle className={classes.title}>
        {t(`${intlRoot}.title`)}
      </WidgetTitle>
      <Price amount={amount} className={classes.price} period={period} />
      <NextBillingDate className={classes.endDate} date={endDate} />
      <Progress requestsUsed={requestsUsed} />
      <EditPlanDialog isOpened={isOpened} onClose={onClose} />
    </Widget>
  );
};
