import { t } from '@ankr.com/common';
import { Button } from '@mui/material';

import { useDialog } from 'modules/common/hooks/useDialog';

import { IUseDetailsButtonProps } from './useDetailsButton';
import { DetailsButtonContent } from './DetailsButtonContent';
import { useDetailsButtonContainerStyles } from './useDetailsButtonContainerStyles';

interface IDetailsButtonContainerProps
  extends Omit<IUseDetailsButtonProps, 'isOpened'> {}

export const DetailsButtonContainer = ({
  amount,
  token,
  txHash,
  date,
}: IDetailsButtonContainerProps) => {
  const { classes } = useDetailsButtonContainerStyles();
  const { isOpened, onClose, onOpen } = useDialog();

  return (
    <>
      <Button
        variant="outlined"
        size="extraSmall"
        className={classes.buttonRoot}
        onClick={onOpen}
      >
        {t('account.payment-table.details')}
      </Button>

      {isOpened && (
        <DetailsButtonContent
          amount={amount}
          date={date}
          txHash={txHash}
          token={token}
          isOpened={isOpened}
          onClose={onClose}
        />
      )}
    </>
  );
};
