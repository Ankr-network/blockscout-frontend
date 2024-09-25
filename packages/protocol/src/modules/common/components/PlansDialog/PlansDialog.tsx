import { t } from '@ankr.com/common';
import { Typography } from '@mui/material';
import Scrollbars from 'react-custom-scrollbars';

import { EGeneralPlanList } from 'domains/pricing/screens/Pricing/components/Plans/PlansUtils';
import {
  EnterprisePlan,
  Plan,
} from 'domains/pricing/screens/Pricing/components/Plans/components/Plan';
import { Dialog } from 'uiKit/Dialog';
import { useWindowHeight } from 'hooks/useWindowHeight';
import { dialogAuthoHeightMax } from 'modules/common/constants/const';

import { usePlansDialogStyles } from './usePlansDialogStyles';

export interface IPlansDialogProps {
  onClose: () => void;
  open: boolean;
}

export const PlansDialog = ({ onClose, open }: IPlansDialogProps) => {
  const windowHeight = useWindowHeight();
  const { classes } = usePlansDialogStyles({ windowHeight });

  return (
    <Dialog
      className={classes.root}
      maxPxWidth={1200}
      classes={{
        container: classes.dialogContainer,
      }}
      open={open}
      onClose={onClose}
      paperClassName={classes.paperRoot}
      titleClassName={classes.title}
      keepMounted
    >
      <Scrollbars autoHeight autoHeightMax={dialogAuthoHeightMax}>
        <Typography variant="h4" className={classes.dialogTitle}>
          {t('chain-item-dialog.title')}
        </Typography>
        <div className={classes.container}>
          {Object.values(EGeneralPlanList).map(planName => (
            <div key={`item-${planName}`} className={classes.itemWrapper}>
              <Plan
                clickCallback={onClose}
                planName={planName}
                rootClassname={classes.planRoot}
              />
            </div>
          ))}
        </div>
        <EnterprisePlan />
      </Scrollbars>
    </Dialog>
  );
};
