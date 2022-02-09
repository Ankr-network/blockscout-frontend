import { Typography } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import React from 'react';
import { ExternalLinkIcon } from 'uiKit/Icons/ExternalLinkIcon';
import { NavLink } from 'uiKit/NavLink';
import { useClaimSuccessStyles } from './useClaimSuccessStyles';

interface IClaimSuccessProps {
  isETHProject: boolean;
  rewardTokenName: string;
  rewardTokenSymbol: string;
  successLink: string;
}

export const ClaimSuccess = ({
  isETHProject,
  rewardTokenName,
  rewardTokenSymbol,
  successLink,
}: IClaimSuccessProps) => {
  const classes = useClaimSuccessStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.titleArea} variant="h3">
        {t(
          'polkadot-slot-auction.my-rewards-claim-modal.success-section.title',
          {
            rewardTokenSymbol,
          },
        )}
      </Typography>

      <Typography className={classes.messageArea} variant="h5">
        {t(
          'polkadot-slot-auction.my-rewards-claim-modal.success-section.message',
          {
            rewardTokenName,
          },
        )}
      </Typography>

      <div className={classes.actionArea}>
        <NavLink
          className={classes.actionBtn}
          color="primary"
          href={successLink}
          size="large"
          variant="contained"
        >
          <ExternalLinkIcon />

          <span className={classes.actionBtnTxt}>
            {t('polkadot-slot-auction.button.check-transaction')}
          </span>
        </NavLink>
      </div>

      {isETHProject && (
        <Typography className={classes.hintEthArea} variant="body2">
          <span className={classes.hintEthSplitter} />

          <span className={classes.hintEthTxt}>
            {t(
              'polkadot-slot-auction.my-rewards-claim-modal.success-section.hint-eth',
              {
                rewardTokenName,
                rewardTokenSymbol,
              },
            )}
          </span>
        </Typography>
      )}
    </div>
  );
};
