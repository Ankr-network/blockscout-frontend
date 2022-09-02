import { Typography } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { t } from 'common';

import { featuresConfig } from 'modules/common/const';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
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
}: IClaimSuccessProps): JSX.Element => {
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
            fullWidth
            className={classes.actionBtn}
            color="primary"
            size="large"
            onClick={onGoToDashboard}
          >
            {t('polkadot-slot-auction.button.go-to-dashboard')}
          </Button>
        )}

        <Button
          fullWidth
          className={classes.actionBtn}
          disabled={isLoadingBtn}
          size="large"
          variant="outlined"
          onClick={onAddToWallet}
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
