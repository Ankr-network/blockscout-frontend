import { Typography } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import { featuresConfig } from 'modules/common/const';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { t } from 'modules/i18n/utils/intl';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button } from 'uiKit/Button';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';
import { addTokenWeb3Wallet } from '../../../actions/addTokenWeb3Wallet';
import { useClaimSuccessStyles } from './useClaimSuccessStyles';

interface IClaimSuccessProps {
  bondTokenSymbol: string;
  loanId: number;
}

export const ClaimSuccess = ({
  bondTokenSymbol,
  loanId,
}: IClaimSuccessProps) => {
  const classes = useClaimSuccessStyles();
  const dispatch = useDispatchRequest();
  const history = useHistory();

  const [isLoadingBtn, setIsLoadingBtn] = useState(false);

  const onAddToWallet = async (): Promise<void> => {
    setIsLoadingBtn(true);

    await dispatch(addTokenWeb3Wallet({ loanId }));

    setIsLoadingBtn(false);
  };

  const onGoToDashboard = (): void =>
    history.push(DashboardRoutes.dashboard.path);

  return (
    <div className={classes.root}>
      <Typography className={classes.titleArea} variant="h3">
        {t(
          'polkadot-slot-auction.projects-list-claim-modal.success-section.title',
        )}
      </Typography>

      {featuresConfig.isActiveClaimNotification && (
        <Typography className={classes.messageArea} variant="body2">
          {t(
            'polkadot-slot-auction.projects-list-claim-modal.success-section.message',
            {
              bondTokenSymbol,
            },
          )}
        </Typography>
      )}

      <div className={classes.actionArea}>
        {featuresConfig.isActiveClaimNotification && (
          <Button
            className={classes.actionBtn}
            color="primary"
            fullWidth
            onClick={onGoToDashboard}
            size="large"
          >
            {t('polkadot-slot-auction.button.go-to-dashboard')}
          </Button>
        )}

        <Button
          className={classes.actionBtn}
          disabled={isLoadingBtn}
          fullWidth
          onClick={onAddToWallet}
          size="large"
          variant="outlined"
        >
          <span className={classes.actionBtnTxt}>
            {t('polkadot-slot-auction.button.add-to-wallet', {
              bondTokenSymbol,
            })}
          </span>

          {isLoadingBtn && <QueryLoadingAbsolute size={44} />}
        </Button>
      </div>
    </div>
  );
};
