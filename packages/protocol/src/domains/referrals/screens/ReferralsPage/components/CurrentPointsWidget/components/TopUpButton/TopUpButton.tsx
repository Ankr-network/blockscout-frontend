import { Button } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import {
  TopUpPAYGBalanceDialog,
  useTopUpPAYGBalanceDialog,
} from '../../../TopUpPAYGBalanceDialog';
import { topUpButtonTranslation } from './translation';
import { useTopUpButtonStyles } from './useTopUpButtonStyles';

export interface ITopUpButtonProps {
  isDisabled?: boolean;
}

export const TopUpButton = ({ isDisabled }: ITopUpButtonProps) => {
  const { classes } = useTopUpButtonStyles();

  const { keys, t } = useTranslation(topUpButtonTranslation);

  const { handleTopUpPAYGBalanceDialogOpen, topUpPAYGBalanceDialogProps } =
    useTopUpPAYGBalanceDialog();

  return (
    <>
      <Button
        className={classes.root}
        disabled={isDisabled}
        onClick={handleTopUpPAYGBalanceDialogOpen}
        size="small"
        variant="contained"
      >
        {t(keys.text)}
      </Button>
      <TopUpPAYGBalanceDialog {...topUpPAYGBalanceDialogProps} />
    </>
  );
};
