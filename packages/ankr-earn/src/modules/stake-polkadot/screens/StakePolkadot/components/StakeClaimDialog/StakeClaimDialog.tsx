import { Box, Paper, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { Field, Form, FormRenderProps } from 'react-final-form';

import { t, tHTML } from 'common';

import { ConnectWalletsModal } from 'modules/auth/common/components/ConnectWalletsModal';
import { DEFAULT_ROUNDING } from 'modules/common/const';
import { getShortTxHash } from 'modules/common/utils/getShortStr';
import {
  EPolkadotNetworks,
  TPolkadotETHToken,
  TPolkadotToken,
} from 'modules/stake-polkadot/types';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { Button } from 'uiKit/Button';
import { CheckboxField } from 'uiKit/CheckboxField';
import { CompleteCircleIcon } from 'uiKit/Icons/CompleteCircleIcon';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';

import {
  IFormPayload,
  useStakeClaimDialogData,
} from './hooks/useStakeClaimDialogData';
import { useStakeClaimDialogStyles } from './useStakeClaimDialogStyles';

interface IStakeClaimDialogProps {
  ethToken: TPolkadotETHToken;
  network: EPolkadotNetworks;
  polkadotToken: TPolkadotToken;
  onSubmit: () => void;
}

export const StakeClaimDialog = ({
  ethToken,
  network,
  polkadotToken,
  onSubmit,
}: IStakeClaimDialogProps): JSX.Element => {
  const classes = useStakeClaimDialogStyles();

  const {
    claimableTokensAmount,
    ethAmountTxt,
    isLoadingClaim,
    isLoadingTopBtn,
    isOpenedModal,
    isShowBottomItems,
    isValidETHNetwork,
    isWithClaimableTokens,
    polkadotAddress,
    polkadotNetworkName,
    secondStepTitle,
    topBtnTxt,
    walletsGroupTypes,
    onCloseModal,
    onFormSubmit,
  } = useStakeClaimDialogData({
    ethToken,
    network,
    polkadotToken,
    onSubmit,
  });

  const renderForm = ({
    handleSubmit,
  }: FormRenderProps<IFormPayload>): JSX.Element => (
    <>
      <Box className={classes.itemTop}>
        <Box className={classNames(classes.icon, classes.iconSecond)}>2</Box>

        <Typography className={classes.text} variant="h4">
          {secondStepTitle}
        </Typography>

        {!isWithClaimableTokens && (
          <Box className={classes.action}>
            {isLoadingTopBtn ? (
              <QueryLoadingCentered size={40} />
            ) : (
              <Button
                className={classNames(
                  isValidETHNetwork && classes.actionClaimBtn,
                )}
                color="primary"
                disabled={isLoadingClaim}
                isLoading={isLoadingClaim}
                size="large"
                type="submit"
                onClick={handleSubmit}
              >
                {topBtnTxt}
              </Button>
            )}
          </Box>
        )}
      </Box>

      {isWithClaimableTokens && (
        <Box>
          <Typography className={classes.info} variant="subtitle1">
            {tHTML('stake-polkadot.stake-claim-dialog.claimable-info', {
              polkadotToken,
              value: claimableTokensAmount
                .decimalPlaces(DEFAULT_ROUNDING)
                .toFormat(),
              ethToken,
            })}
          </Typography>
        </Box>
      )}

      {isValidETHNetwork && (
        <Box className={classNames(isShowBottomItems && classes.itemBottom)}>
          {isWithClaimableTokens && (
            <Box className={classes.valueDescription}>
              <StakeDescriptionContainer>
                <StakeDescriptionName>
                  {t('stake.you-will-get')}
                </StakeDescriptionName>

                <StakeDescriptionValue>
                  <StakeDescriptionAmount
                    isWithTooltip={false}
                    symbol={ethToken}
                    value={ethAmountTxt ?? ''}
                  />
                </StakeDescriptionValue>
              </StakeDescriptionContainer>
            </Box>
          )}

          {isWithClaimableTokens && (
            <Button
              fullWidth
              color="primary"
              disabled={isLoadingClaim}
              isLoading={isLoadingClaim}
              size="large"
              type="submit"
              onClick={handleSubmit}
            >
              {t('stake-polkadot.stake-claim-dialog.claim-btn')}
            </Button>
          )}

          {!isLoadingClaim && (
            <Field
              component={CheckboxField}
              name="isLedgerWallet"
              type="checkbox"
            >
              <Typography className={classes.checkboxTxt} variant="body2">
                {t('stake-polkadot.stake-claim-dialog.ledger-wallet-info', {
                  shortAccount: getShortTxHash(polkadotAddress),
                })}
              </Typography>
            </Field>
          )}
        </Box>
      )}
    </>
  );

  return (
    <Box className={classes.root}>
      <Paper className={classes.item}>
        <Box className={classes.itemTop}>
          <CompleteCircleIcon className={classes.icon} />

          <Typography className={classes.text} variant="h4">
            {t('stake-polkadot.stake-claim-dialog.first-title', {
              token: polkadotToken,
              network: polkadotNetworkName,
            })}
          </Typography>
        </Box>
      </Paper>

      <Paper className={classes.item}>
        <Form render={renderForm} onSubmit={onFormSubmit} />
      </Paper>

      <ConnectWalletsModal
        isOpen={isOpenedModal}
        walletsGroupTypes={walletsGroupTypes}
        onClose={onCloseModal}
      />
    </Box>
  );
};
